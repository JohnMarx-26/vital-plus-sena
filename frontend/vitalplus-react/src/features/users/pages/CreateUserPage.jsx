// importaciones
import UserForm from "@/features/users/components/UserForm";

// import { SquarePen } from "lucide-react";
import FormLayout from "@/shared/layout/FormLayout";

export default function CreateUserPage() {
    return (
        <FormLayout>
            <UserForm />
        </FormLayout>
    );
}