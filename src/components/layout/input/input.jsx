import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function InputTemplate({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
  styleInput,
  ...props
}) {
  return (
    <>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor={id} className={"text-lg"}>{label}</Label>
        <Input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={styleInput}
          {...props}
        />
      </div>
    </>
  );
}

export function TextareaTemplate({ label, id, placeholder, value, onChange }) {
  return (
    <>
      <div className="grid w-full gap-2">
        <Label htmlFor={id} className={"text-lg"}>{label}</Label>
        <Textarea
          placeholder={placeholder}
          id={id}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
}

export default { InputTemplate, TextareaTemplate };
