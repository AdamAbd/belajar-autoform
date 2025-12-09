<script setup lang="ts">
import AppVeeValidateForm from './components/organism/AppVeeValidateForm.vue'

import { z } from 'zod';
import AutoForm from '@/components/organism/AppAutoForm.vue';

// Define your schema
const formSchema = z.object({
  username: z.string().min(2).describe("Your unique username"),
  age: z.number().min(18).describe("Age (must be 18+)"),
  role: z.enum(['admin', 'user', 'guest']).describe("System Role"),
  agreeTerms: z.boolean().describe("I agree to the terms"),
});

function handleFormSubmit(values: any) {
  console.log("Form Submitted:", values);
  alert(JSON.stringify(values, null, 2));
}
</script>

<template>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>

  <div class="grid grid-cols-2 gap-4 mt-4">
    <AppVeeValidateForm />

    <div>
      <h1 class="text-2xl font-bold mb-4">Vue AutoForm</h1>

      <AutoForm :schema="formSchema" :on-submit="handleFormSubmit" />
    </div>
  </div>
</template>

<style scoped></style>
