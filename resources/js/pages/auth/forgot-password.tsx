// Components
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <AuthLayout
            title=""
            description=""
            

        >
            <Head title="Restablecer contraseña" />

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
                .form-group {
                    text-align: left;
                    margin-bottom: 18px;
                }
                .form-group label {
                    color: #0f172a;
                    font-weight: 600;
                }
                .input-group {
                    position: relative;
                }
                .input-group i {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #475569;
                    z-index: 10;
                }
                .input-custom {
                    width: 100% !important;
                    padding: 12px 12px 12px 40px !important;
                    border: 1px solid #cbd5e1 !important;
                    border-radius: 10px !important;
                    height: auto !important;
                    box-shadow: inset 0 1px 2px rgba(15, 23, 42, 0.08);
                    background: #f8fafc !important;
                    color: #0f172a !important;
                }

                .blacktext {
                        color: #0f172a;

                        }

                .input-custom::placeholder {
                    color: #94a3b8 !important;
                    opacity: 1;
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
                .footer-links p { margin-bottom: 8px; }
                .footer-links a { color: var(--secondary); font-weight: 600; }
            `}} />

            <div className="login-card">
                <header className="login-header">
                    <i className="fa-solid fa-envelope"></i>
                    <h2>Restablecer contraseña</h2>
                    <p>Introduce tu correo para recibir un enlace de restablecimiento.</p>
                </header>

                {status && (
                    <div className="mb-4 text-center text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <div className="space-y-6">
                    <Form {...email.form()}>
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className='blacktext'>Correo electrónico</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        autoComplete="off"
                                        autoFocus
                                        placeholder="correo@ejemplo.com"
                                        className="input-custom"

                                    />

                                    <InputError message={errors.email} />
                                </div>

                                <div className="my-6 flex items-center justify-start">
                                    <Button
                                        className="btn-login"
                                        disabled={processing}
                                        data-test="email-password-reset-link-button"
                                    >
                                        {processing && (
                                            <LoaderCircle className="h-4 w-4 animate-spin" />
                                        )}
                                        Enviar enlace
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>

                    <div className="space-x-1 text-center text-sm text-muted-foreground">
                        <span>O regresa a</span>
                        <TextLink className='blacktext' href={login()}>iniciar sesión</TextLink>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
