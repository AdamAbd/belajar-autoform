// useAutoForm.ts
import { z } from 'zod';

export type FieldType = 'text' | 'number' | 'checkbox' | 'select' | 'date' | 'textarea';

export interface AutoFormField {
  name: string;
  label: string;
  type: FieldType;
  options?: { label: string; value: string | number }[]; // For enums
  description?: string;
  required: boolean;
  component?: any; // Allow overriding specific components
}

// Helper to determine input type from Zod definition
function getFieldType(def: any): FieldType {
  if (def.typeName === 'ZodBoolean') return 'checkbox';
  if (def.typeName === 'ZodDate') return 'date';
  if (def.typeName === 'ZodNumber') return 'number';
  if (def.typeName === 'ZodEnum' || def.typeName === 'ZodNativeEnum') return 'select';
  return 'text'; // Default to text for strings
}

// Helper to get options from Zod Enum
function getEnumOptions(def: any) {
  if (def.typeName === 'ZodEnum') {
    return def.values.map((v: string) => ({ label: v, value: v }));
  }
  return undefined;
}

export function parseZodSchema(schema: z.ZodObject<any> | z.ZodEffects<any>): AutoFormField[] {
  // Handle ZodEffects (like .refine) by unwrapping if necessary
  const shape = schema._def.typeName === 'ZodEffects' 
    ? (schema as z.ZodEffects<any>)._def.schema.shape 
    : (schema as z.ZodObject<any>).shape;

  return Object.keys(shape).map((key) => {
    let fieldDef = shape[key]._def;
    
    // Unwrap Optional/Nullable to get the inner type
    const isOptional = fieldDef.typeName === 'ZodOptional' || fieldDef.typeName === 'ZodNullable';
    if (isOptional) {
      fieldDef = fieldDef.innerType._def;
    }

    const description = fieldDef.description; // Read .describe('...')
    const label = description || key.charAt(0).toUpperCase() + key.slice(1); // Fallback to Title Case key

    return {
      name: key,
      label,
      description,
      required: !isOptional,
      type: getFieldType(fieldDef),
      options: getEnumOptions(fieldDef),
    };
  });
}