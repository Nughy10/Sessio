import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    // Validación
    if (!email || !name) {
      return Response.json(
        { error: 'Email y nombre son requeridos' },
        { status: 400 }
      );
    }

    // Guardar en Supabase
    const { error } = await supabase
      .from('early_access_waitlist')
      .insert([{ email, name, created_at: new Date() }]);

    if (error) {
      console.error('Supabase error:', error);
      return Response.json(
        { error: 'Error al guardar' },
        { status: 500 }
      );
    }

    return Response.json(
      { success: true, message: 'Registrado exitosamente' },
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