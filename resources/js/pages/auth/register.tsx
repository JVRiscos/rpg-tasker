import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    return (
        <AuthLayout
            title=""
            description=""
        >
            <Head title="Registro" />

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

                .blacktext {
                        color: #0f172a;
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
                    <i className="fa-solid fa-user-plus"></i>
                    <h2>Crear una cuenta</h2>
                    <p>Completa la información para comenzar tu aventura.</p>
                </header>

                <Form
                    {...store.form()}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6" >
                                <div className="grid gap-2">
                                    <Label htmlFor="name" className="blacktext">Nombre</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        name="name"
                                        placeholder="Nombre completo"
                                        className="input-custom"
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="blacktext">Correo electrónico</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        name="email"
                                        placeholder="correo@ejemplo.com"
                                        className="input-custom"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="blacktext">
                                        Contraseña
                                    </Label>
                                    <PasswordInput
                                        id="password"
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        name="password"
                                        placeholder="Contraseña"
                                        className="input-custom"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation" className="blacktext">
                                        Confirmar contraseña
                                    </Label>
                                    <PasswordInput
                                        id="password_confirmation"
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        name="password_confirmation"
                                        placeholder="Confirmar contraseña"
                                        className="input-custom"
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="btn-login"
                                    tabIndex={5}
                                    data-test="register-user-button"
                                >
                                    {processing && <Spinner />}
                                    Crear cuenta
                                </Button>
                            </div>

                            <div className="text-center text-sm text-muted-foreground">
                                ¿Ya tienes cuenta?{' '}
                                <TextLink className="blacktext" href={login()} tabIndex={6}>
                                    Iniciar sesión
                                </TextLink>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AuthLayout>
    );
}
