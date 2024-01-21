<template>
    <div
        class="relative flex h-[var(--content-height)] flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12"
    >
        <img
            src="/img/beams.jpg"
            alt=""
            class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
            width="1308"
        />
        <div
            class="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
        ></div>
        <div class="relative bg-white p-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:w-[80%] sm:rounded-lg">
            <slot />
        </div>
    </div>
</template>
