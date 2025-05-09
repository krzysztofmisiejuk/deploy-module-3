import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'
import { registerSchema } from '@/schemas/registerSchema'
import { EyeClosed, EyeOpen } from '@/components'

type RegisterFormData = z.infer<typeof registerSchema>

type TextFieldNames = 'email' | 'mobileNumber' | 'password' | 'confirmPassword' | 'country'

interface RegisterInputProps {
  form: UseFormReturn<RegisterFormData>
  name: TextFieldNames
  label: string
  placeholder: string
  type?: string
  showToggle?: boolean
  isVisible?: boolean
  onToggleVisibility?: () => void
}

export default function RegisterInput({
  form,
  name,
  label,
  placeholder,
  type = 'text',
  showToggle = false,
  isVisible = false,
  onToggleVisibility,
}: RegisterInputProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className='relative'>
            <FormControl>
              <Input
                type={showToggle ? (isVisible ? 'text' : 'password') : type}
                placeholder={placeholder}
                {...field}
                onChange={(e) => {
                  field.onChange(e)
                  form.trigger(name)
                }}
              />
            </FormControl>
            {showToggle && (
              <button
                type='button'
                className='absolute right-3 top-1/2 -translate-y-1/2'
                onClick={onToggleVisibility}
              >
                {isVisible ? <EyeOpen /> : <EyeClosed />}
              </button>
            )}
          </div>
          <FormMessage
            variant={form.formState.errors[name] ? 'error' : 'success'}
          >
            {form.formState.errors[name]
              ? form.formState.errors[name].message
              : field.value && `${label} is valid!`}
          </FormMessage>
        </FormItem>
      )}
    />
  )
}