import { sendPasswordLink } from "~/services/auth.server";
import AuthCard from "../auth-card";
import Input from "~/components/form/input";
import Button from "~/components/form/button";
import Spinner from "~/components/spinner";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import LoadingButton from "~/components/form/loading-button";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get("email") as string;

  const res: any = await sendPasswordLink({ email });

  return res?.errors || null;
}

export default function PasswordReset() {
  const errors = useActionData();
  const transition = useNavigation();

  const status = transition.state;
  let isSuccessfulSubmission = status === "idle" && errors === null;

  return (
    <AuthCard>
      <h1 className="text-lg text-slate-700 dark:text-white">
        Redefinir Senha
      </h1>
      {!isSuccessfulSubmission ? (
        <Form replace method="post" className="mt-8">
          <Input
            label="Coloque seu email para redefinir sua senha:"
            name="email"
            id="email"
          ></Input>
          <div className="text-red-400 text-xs mt-2 min-h-4">{errors}</div>

          <div className="text-right">
            <LoadingButton
              type="submit"
              className="mt-8 relative transition duration-200"
              status={status}
              isSuccessfulSubmission={isSuccessfulSubmission}
            >
              Redefinir Senha
            </LoadingButton>
          </div>
        </Form>
      ) : (
        <div className="text-slate-500 dark:text-slate-400 font-light text-sm mt-8">
          Seu email foi enviado! Verifique sua caixa de entrada e siga as
          instruções no email.
        </div>
      )}
    </AuthCard>
  );
}
