<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { computed } from 'vue';
import { z } from 'zod';
import { parseZodSchema } from '@/lib/useAutoform';

// Props
const props = defineProps<{
    schema: z.ZodObject<any>;
    onSubmit: (values: any) => void;
}>();

// 1. Parse Schema into Fields
const fields = computed(() => parseZodSchema(props.schema));

// 2. Setup Vee-Validate Form
const { handleSubmit, errors, defineField } = useForm({
    validationSchema: toTypedSchema(props.schema),
});

// 3. Create Submit Handler
const submit = handleSubmit((values) => {
    props.onSubmit(values);
});
</script>

<template>
    <form @submit="submit" class="space-y-4">
        <div v-for="field in fields" :key="field.name" class="flex flex-col gap-1">

            <slot :name="field.name" :field="field" :props="defineField(field.name)[0]" :error="errors[field.name]">
                <label :for="field.name" class="font-medium text-sm">
                    {{ field.name }} <span v-if="field.required" class="text-red-500">*</span>
                </label>

                <template v-if="field.type === 'select'">
                    <select :id="field.name" v-bind="defineField(field.name)[0]" class="border p-2 rounded">
                        <option value="" disabled>Select an option</option>
                        <option v-for="opt in field.options" :key="opt.value" :value="opt.value">
                            {{ opt.label }}
                        </option>
                    </select>
                </template>

                <template v-else-if="field.type === 'checkbox'">
                    <input type="checkbox" :id="field.name" v-bind="defineField(field.name)[0]" class="w-4 h-4" />
                </template>

                <template v-else>
                    <input :type="field.type" :id="field.name" v-bind="defineField(field.name)[0]"
                        class="border p-2 rounded" />
                </template>

                <p v-if="field.description" class="text-xs text-gray-500">{{ field.description }}</p>

                <span v-if="errors[field.name]" class="text-red-500 text-sm">
                    {{ errors[field.name] }}
                </span>
            </slot>
        </div>

        <button type="submit" class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            Submit
        </button>
    </form>
</template>