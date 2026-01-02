import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileContent, fileName } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    if (!fileContent) {
      throw new Error('No file content provided');
    }

    console.log(`Parsing resume file: ${fileName}`);

    const systemPrompt = `You are an expert resume parser. Extract structured data from the resume text provided.
You must return a valid JSON object with the following structure:

{
  "personalDetails": {
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "linkedin": "string or empty",
    "website": "string or empty",
    "github": "string or empty"
  },
  "summary": "string - professional summary if exists",
  "skills": {
    "technical": ["array of technical skills"],
    "soft": ["array of soft skills"]
  },
  "workExperience": [
    {
      "company": "string",
      "position": "string",
      "location": "string",
      "startDate": "string (format: YYYY-MM or Month YYYY)",
      "endDate": "string (format: YYYY-MM, Month YYYY, or 'Present')",
      "current": boolean,
      "description": "string",
      "bullets": ["array of achievement/responsibility bullet points"]
    }
  ],
  "projects": [
    {
      "name": "string",
      "description": "string",
      "technologies": ["array of technologies used"],
      "link": "string or empty",
      "bullets": ["array of bullet points about the project"]
    }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "field": "string",
      "location": "string",
      "startDate": "string",
      "endDate": "string",
      "gpa": "string or empty",
      "achievements": ["array of achievements or empty"]
    }
  ],
  "certifications": [
    {
      "name": "string",
      "issuer": "string",
      "date": "string",
      "link": "string or empty"
    }
  ]
}

Rules:
1. Extract as much information as possible from the resume
2. If a field is not found, use an empty string or empty array
3. For skills, separate into technical (programming, tools, frameworks) and soft skills (communication, leadership)
4. Ensure dates are in a readable format
5. Return ONLY the JSON object, no additional text or markdown`;

    const userPrompt = `Parse this resume and extract all information into the structured JSON format:

${fileContent}`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits exhausted. Please add credits in Settings.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('Failed to parse resume');
    }

    const data = await response.json();
    const generatedContent = data.choices?.[0]?.message?.content;

    if (!generatedContent) {
      throw new Error('No content generated');
    }

    // Parse the JSON response
    let parsedResume;
    try {
      // Remove any markdown code blocks if present
      const cleanedContent = generatedContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsedResume = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', generatedContent);
      throw new Error('Failed to parse resume data');
    }

    console.log('Successfully parsed resume');

    return new Response(JSON.stringify({ data: parsedResume }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in parse-resume-file:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to parse resume';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
