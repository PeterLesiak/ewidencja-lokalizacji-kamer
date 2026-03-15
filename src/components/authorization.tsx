'use client';

import { ComponentProps, PropsWithChildren, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
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
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useIsMobile } from '@/hooks/use-mobile';

export function Authorization({ children }: PropsWithChildren) {
  const [isAuthorized, setIsAuthorized] = useLocalStorage(
    'authorized',
    z.boolean(),
    false,
  );

  if (isAuthorized) return children;

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

const signInSchema = z.object({
  login: z.string().min(3).max(50),
  password: z.string().min(3).max(50),
});

function SignInForm({ close, ...props }: ComponentProps<'form'> & { close: () => void }) {
  const form = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
    validators: {
      onSubmit: signInSchema,
    },
    onSubmit(props) {
      close();
    },
  });

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        form.handleSubmit();
      }}
      {...props}
    >
      <FieldGroup>
        <form.Field
          name="login"
          children={field => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Login</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    spellCheck={false}
                    autoComplete="off"
                    autoCapitalize="off"
                    aria-invalid={isInvalid}
                  />
                  <InputGroupAddon align="inline-start">
                    <User2Icon />
                  </InputGroupAddon>
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <form.Field
          name="password"
          children={field => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    type={isPasswordHidden ? 'password' : 'text'}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    spellCheck={false}
                    autoCapitalize="off"
                    aria-invalid={isInvalid}
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
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <Button
          type="submit"
          size="lg"
          className="[--primary:var(--color-indigo-600)] dark:[--primary:var(--color-indigo-200)]"
        >
          Sign In <LogInIcon />
        </Button>
      </FieldGroup>
    </form>
  );
}
