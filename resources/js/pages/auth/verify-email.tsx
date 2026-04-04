// Components
import { Form, Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="Verificar correo"
            description="Verifica tu correo electrónico para completar el registro."
        >
            <Head title="Verificar correo" />

            <style dangerouslySetInnerHTML={{ __html: `
                :root {
                    --primary: #5b21b6;
                    --secondary: #4f46e5;
                    --background: #0f172a;
                    --card: #ffffff;
                    --text: #0f172a;
                    --muted: #64748b;
                }
                .login-card {
                    background: var(--card);
                    padding: 36px;
                    border-radius: 20px;
                    box-shadow: 0 18px 42px rgba(15, 23, 42, 0.32);
                    width: 100%;
                    max-width: 420px;
                    margin: 0 auto;
                    position: relative;
                    overflow: hidden;
                    border: 1px solid rgba(99, 102, 241, 0.20);
                }
                .login-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(99,102,241,0.18), rgba(167,139,250,0.10));
                    pointer-events: none;
                }
                .login-card > * { position: relative; z-index: 1; }
                .login-header {
                    margin-bottom: 28px;
                }
                .login-header i {
                    font-size: 2.8rem;
                    color: var(--primary);
                    margin-bottom: 10px;
                    display: block;
                }
                .login-header h2 {
                    margin: 0;
                    color: var(--text);
                    font-size: 2rem;
                    font-weight: 800;
                }
                .login-header p {
                    color: var(--muted);
                    margin-top: 4px;
                    font-size: 0.96rem;
                }
                .btn-login {
                    width: 100%;
                    background: linear-gradient(90deg, var(--primary), var(--secondary)) !important;
                    color: white !important;
                    border: none !important;
                    padding: 13px 18px !important;
                    border-radius: 10px !important;
                    font-size: 1rem !important;
                    font-weight: 700 !important;
                    cursor: pointer;
                    margin-top: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.02em;
                    transition: transform .2s ease, opacity .2s ease;
                }
                .btn-login:hover { transform: translateY(-1px); opacity: 0.96; }
                .footer-links {
                    margin-top: 20px;
                    font-size: 0.86rem;
                    color: var(--muted);
                }
            `}} />

            <div className="login-card">
                <header className="login-header">
                    <i className="fa-solid fa-envelope-circle-check"></i>
                    <h2>Verificar correo</h2>
                    <p>Por favor confirma tu correo electrónico para seguir.</p>
                </header>

                {status === 'verification-link-sent' && (
                    <div className="mb-4 text-center text-sm font-medium text-green-600">
                        Se ha enviado un nuevo enlace de verificación al correo que proporcionaste.
                    </div>
                )}

                <Form {...send.form()} className="space-y-6 text-center">
                    {({ processing }) => (
                        <>
                            <Button disabled={processing} className="btn-login">
                                {processing && <Spinner />}
                                Reenviar correo de verificación
                            </Button>

                            <TextLink
                                href={logout()}
                                className="mx-auto block text-sm"
                            >
                                Cerrar sesión
                            </TextLink>
                        </>
                    )}
                </Form>
            </div>
        </AuthLayout>
    );
}
