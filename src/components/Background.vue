<template>
    <div class="flex h-[var(--content-height)] flex-col justify-center overflow-hidden py-6 sm:py-12">
        <div class="relative z-10 p-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:w-[90%] sm:rounded-lg">
            <slot />
        </div>
    </div>
</template>
