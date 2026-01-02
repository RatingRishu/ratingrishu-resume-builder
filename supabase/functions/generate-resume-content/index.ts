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
    const { type, jobRole, experienceLevel, company, position, currentDescription, targetRole } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    let systemPrompt = '';
    let userPrompt = '';

    switch (type) {
      case 'summary':
        systemPrompt = `You are an expert resume writer who creates ATS-optimized professional summaries. 
Write compelling, keyword-rich summaries that highlight achievements and value proposition.
Use action-oriented language and quantify achievements where possible.
Keep summaries between 3-4 sentences, approximately 50-80 words.`;
        userPrompt = `Write a professional summary for a ${experienceLevel} ${jobRole}. 
Focus on key skills, achievements, and value they bring to employers.
Make it ATS-friendly with relevant industry keywords.`;
        break;

      case 'bullets':
        systemPrompt = `You are an expert resume writer who creates impactful achievement-focused bullet points.
Use the STAR method implicitly (Situation, Task, Action, Result).
Start each bullet with a strong action verb.
Include metrics and quantifiable results when possible.
Keep each bullet to 1-2 lines.`;
        userPrompt = `Generate 4-5 bullet points for a ${position} role at ${company || 'a company'}.
${currentDescription ? `Current job description context: ${currentDescription}` : ''}
Focus on achievements, not just responsibilities.
Use strong action verbs and quantify results.`;
        break;

      case 'optimize':
        systemPrompt = `You are an ATS optimization expert. 
Rewrite content to be more keyword-rich and ATS-friendly while maintaining readability.
Include industry-standard terminology and skills.`;
        userPrompt = `Optimize this resume content for a ${targetRole} position:
"${currentDescription}"
Make it more impactful with action verbs and measurable achievements.`;
        break;

      default:
        throw new Error('Invalid generation type');
    }

    console.log(`Generating ${type} content for ${jobRole || position}`);

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
      throw new Error('AI generation failed');
    }

    const data = await response.json();
    const generatedContent = data.choices?.[0]?.message?.content;

    if (!generatedContent) {
      throw new Error('No content generated');
    }

    console.log(`Successfully generated ${type} content`);

    return new Response(JSON.stringify({ content: generatedContent }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-resume-content:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate content';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
