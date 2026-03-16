'use client';

import { ComponentProps, PropsWithChildren, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  LogInIcon,
  User2Icon,
  UserRoundKeyIcon,
} from 'lucide-react';

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { signIn } from '@/actions/sign-in';
import { signInSchema } from '@/lib/sign-in';
import { zodResolver } from '@hookform/resolvers/zod';

export function Authorization({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(true);
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen} dismissible={false} autoFocus>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="flex items-center justify-center gap-2 text-lg">
                Authorization <UserRoundKeyIcon size={18} />
              </DrawerTitle>
            </DrawerHeader>

            <SignInForm close={() => setOpen(false)} className="p-4 pt-0" />
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen} disablePointerDismissal>
          <DialogContent showCloseButton={false} className="duration-300">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-center gap-4 text-2xl">
                Authorization <UserRoundKeyIcon size={22} />
              </DialogTitle>
            </DialogHeader>

            <SignInForm close={() => setOpen(false)} className="p-4 pt-0" />
          </DialogContent>
        </Dialog>
      )}

      {children}
    </>
  );
}

function SignInForm({ close, ...props }: ComponentProps<'form'> & { close: () => void }) {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    const formData = new FormData();
    formData.set('login', data.login);
    formData.set('password', data.password);

    const state = await signIn(formData);

    if (state?.login) {
      form.setError('login', { types: { value: state.login.errors } });
    }

    if (state?.password) {
      form.setError('password', { types: { value: state.password.errors } });
    }

    if (state === undefined) {
      close();
    }
  }

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
      <FieldGroup>
        <Controller
          name="login"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Login</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id={field.name}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                <InputGroupAddon align="inline-start">
                  <User2Icon />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id={field.name}
                  type={isPasswordHidden ? 'password' : 'text'}
                  spellCheck={false}
                  autoCapitalize="off"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                <InputGroupAddon align="inline-start">
                  <LockIcon />
                </InputGroupAddon>
                <InputGroupAddon
                  align="inline-end"
                  onClick={event => {
                    const input =
                      event.currentTarget.parentElement?.querySelector('input')!;

                    input.focus();

                    requestAnimationFrame(
                      () => (input.selectionStart = input.value.length),
                    );

                    setIsPasswordHidden(!isPasswordHidden);
                  }}
                  className="cursor-pointer text-foreground"
                >
                  {isPasswordHidden ? <EyeIcon /> : <EyeOffIcon />}
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting || form.formState.isValidating}
          size="lg"
          className="[--primary:var(--color-indigo-600)] dark:[--primary:var(--color-indigo-200)]"
        >
          {form.formState.isSubmitting ? (
            '...'
          ) : (
            <>
              Sign In <LogInIcon />
            </>
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
