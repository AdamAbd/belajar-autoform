<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { z } from 'zod'

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

const formSchema = toTypedSchema(
    z.object({
        title: z
            .string()
            .min(5, 'Bug title must be at least 5 characters.')
            .max(32, 'Bug title must be at most 32 characters.'),
        description: z
            .string()
            .min(20, 'Description must be at least 20 characters.')
            .max(100, 'Description must be at most 100 characters.'),
    }),
)
const { handleSubmit, resetForm, meta, values } = useForm({
    validationSchema: formSchema,
    initialValues: {
        title: '',
        description: '',
    },
})
const onSubmit = handleSubmit((data) => {
    console.log(data)
})
</script>

<template>
    <div>
        <h2 class="text-2xl font-bold">
            VeeValidate Form
        </h2>
        <form id="form-vee-demo" @submit="onSubmit">
            <VeeField v-slot="{ field, errors }" name="title">
                <Field :data-invalid="!!errors.length">
                    <FieldLabel for="form-vee-demo-title">
                        Bug Title
                    </FieldLabel>
                    <Input id="form-vee-demo-title" v-bind="field" placeholder="Login button not working on mobile"
                        autocomplete="off" :aria-invalid="!!errors.length" />
                    <FieldError v-if="errors.length" :errors="errors" />
                </Field>
            </VeeField>
            <VeeField v-slot="{ field, errors }" name="description">
                <Field :data-invalid="!!errors.length">
                    <FieldLabel for="form-vee-demo-description">
                        Description
                    </FieldLabel>
                    <Input id="form-vee-demo-description" v-bind="field"
                        placeholder="I'm having an issue with the login button on mobile" autocomplete="off"
                        :aria-invalid="!!errors.length" />
                    <FieldError v-if="errors.length" :errors="errors" />
                </Field>
            </VeeField>

            <Button type="submit" :disabled="!meta.valid">Submit</Button>
        </form>

        {{ values }}
    </div>
</template>

<style scoped></style>
