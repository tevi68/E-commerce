<template>
    <div class="bg-white rounded-lg shadow border border-gray-200 p-4">
        <div class="flex items-center">
            <div
                class="p-3 rounded-lg"
                :class="{
                    'bg-blue-100 text-blue-600': color === 'blue',
                    'bg-green-100 text-green-600': color === 'green',
                    'bg-yellow-100 text-yellow-600': color === 'yellow',
                    'bg-red-100 text-red-600': color === 'red',
                }"
            >
                <i :class="icon" class="text-lg"></i>
            </div>
            <div class="ml-4">
                <p class="text-sm font-medium text-gray-500 truncate">
                    {{ title }}
                </p>
                <p class="text-2xl font-semibold text-gray-900">
                    {{ value }}
                </p>
            </div>
        </div>
        <div class="mt-4 flex items-center">
            <span
                :class="{
                    'text-green-600': trend === 'up',
                    'text-red-600': trend === 'down',
                }"
            >
                <i :class="trend === 'up' ? 'pi pi-arrow-up' : 'pi pi-arrow-down'" class="mr-1"></i>
                {{ change }}
            </span>
            <span class="text-gray-500 text-sm ml-2">vs last period</span>
        </div>
    </div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        title: string;
        value: string;
        change: string;
        icon: string;
        trend: 'up' | 'down';
        color?: 'blue' | 'green' | 'yellow' | 'red';
    }>(),
    {
        color: 'blue',
    }
);
</script>
