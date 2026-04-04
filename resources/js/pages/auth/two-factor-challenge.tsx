import { Form, Head } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useMemo, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/routes/two-factor/login';
import { Spinner } from '@/components/ui/spinner';

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');

    const authConfigContent = useMemo<{
        title: string;
        description: string;
        toggleText: string;
    }>(() => {
        if (showRecoveryInput) {
            return {
                title: 'Código de recuperación',
                description:
                    'Confirma el acceso a tu cuenta ingresando uno de tus códigos de recuperación.',
                toggleText: 'iniciar sesión con un código de autenticación',
            };
        }

        return {
            title: 'Código de autenticación',
            description:
                'Ingresa el código de tu aplicación autenticadora.',
            toggleText: 'iniciar sesión con código de recuperación',
        };
    }, [showRecoveryInput]);

    const toggleRecoveryMode = (clearErrors: () => void): void => {
        setShowRecoveryInput(!showRecoveryInput);
        clearErrors();
        setCode('');
    };

    return (
        <AuthLayout
            title={authConfigContent.title}
            description={authConfigContent.description}
        >
            <Head title="Autenticación de dos factores" />

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
                .btn-login:hover { transform: translateY(-1px); opacity: 0.96; }
                .footer-links {
                    margin-top: 20px;
                    font-size: 0.86rem;
                    color: var(--muted);
                }
                .footer-links p { margin-bottom: 8px; }
                .footer-links a { color: var(--secondary); font-weight: 600; }
            `}} />

            <div className="login-card"></div>
                <header className="login-header">
                    <i className="fa-solid fa-lock"></i>
                    <h2>{authConfigContent.title}</h2>
                    <p>{authConfigContent.description}</p>
                </header>

                <div className="space-y-6">
                    <Form
                        {...store.form()}
                        className="space-y-4"
                        resetOnError
                        resetOnSuccess={!showRecoveryInput}
                    >
                    {({ errors, processing, clearErrors }) => (
                        <>
                            {showRecoveryInput ? (
                                <>
                                    <Input
                                        name="recovery_code"
                                        type="text"
                                        placeholder="Ingresa código de recuperación"
                                        autoFocus={showRecoveryInput}
                                        required
                                        className="input-custom"
                                    />
                                    <InputError
                                        message={errors.recovery_code}
                                    />
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center space-y-3 text-center">
                                    <div className="flex w-full items-center justify-center">
                                        <InputOTP
                                            name="code"
                                            maxLength={OTP_MAX_LENGTH}
                                            value={code}
                                            onChange={(value) => setCode(value)}
                                            disabled={processing}
                                            pattern={REGEXP_ONLY_DIGITS}
                                        >
                                            <InputOTPGroup>
                                                {Array.from(
                                                    { length: OTP_MAX_LENGTH },
                                                    (_, index) => (
                                                        <InputOTPSlot
                                                            key={index}
                                                            index={index}
                                                        />
                                                    ),
                                                )}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>
                                    <InputError message={errors.code} />
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="btn-login"
                                disabled={processing}
                            >
                                {processing && <Spinner />}
                                Continuar
                            </Button>

                            <div className="text-center text-sm text-muted-foreground">
                                <span>o puedes </span>
                                <button
                                    type="button"
                                    className="cursor-pointer text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    onClick={() =>
                                        toggleRecoveryMode(clearErrors)
                                    }
                                >
                                    {authConfigContent.toggleText}
                                </button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AuthLayout>
    );
}
