import {
  getHotkeyHandler,
  useClickOutside,
  useDisclosure,
} from "@mantine/hooks";
import { useForm } from "react-hook-form";
import { Text, TextInput } from "@mantine/core";
import { useCallback } from "react";

interface Props {
  text: string;
  onEdit: (text: string) => void;
}

export const EditableText = ({ text, onEdit }: Props) => {
  const [isEditing, { open, close }] = useDisclosure(false);
  const { handleSubmit, register, reset } = useForm({
    defaultValues: { text },
  });
  const ref = useClickOutside(() => cancelEdit());

  const onSubmit = ({ text }: { text: string }) => {
    onEdit(text);
    cancelEdit();
  };

  const cancelEdit = useCallback(() => {
    close();
    reset();
  }, [close, reset]);

  if (!isEditing)
    return (
      <Text inline w="100%" style={{ cursor: "pointer" }} onClick={open}>
        {text}
      </Text>
    );

  return (
    <form ref={ref} style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        {...register("text")}
        onBlur={cancelEdit}
        onKeyDown={getHotkeyHandler([["Escape", cancelEdit]])}
        autoFocus
      />
    </form>
  );
};
