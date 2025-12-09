<script setup lang="ts">
import AppVeeValidateForm from './components/organism/AppVeeValidateForm.vue'

import { z } from 'zod';
import AppAutoForm from '@/components/organism/AppAutoForm.vue';

// Define your schema
const formSchema = z.object({
  username: z.string().min(2).describe("Your unique username"),
  age: z.number().min(18).describe("Age (must be 18+)"),
  role: z.enum(['admin', 'user', 'guest']).describe("System Role"),
  enableNotifications: z.boolean().describe("Enable Notifications"),
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

      <!-- <AppAutoForm :schema="formSchema" :on-submit="handleFormSubmit" /> -->

      <AppAutoForm :schema="formSchema" :onSubmit="handleFormSubmit">
        <!-- Custom Checkbox for 'agreeTerms' -->
        <template #agreeTerms="{ props, field }">
          <div class="flex items-center gap-2">
            <input type="checkbox" id="agreeTerms" v-bind="props" class="w-5 h-5 border-2 border-blue-500" />
            <label for="agreeTerms" class="text-lg font-bold">{{ field.name }}</label>
          </div>
        </template>
      </AppAutoForm>
    </div>
  </div>
</template>

<style scoped></style>
