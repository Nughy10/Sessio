import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email || !name) {
      return Response.json(
        { error: 'Email y nombre son requeridos' },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    );

    // Guardar en Supabase
    const { error } = await supabase
      .from('early_access_waitlist')
      .insert([{ email, name, created_at: new Date() }]);

    if (error) {
      console.error('Supabase insert error:', error);
      return Response.json(
        { error: 'Error al guardar email' },
        { status: 500 }
      );
    }

    // Responder al usuario
    return Response.json(
      { success: true, message: '¡Registrado! Te enviaremos más info pronto.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error: 'Error del servidor' },
      { status: 500 }
    );
  }
}