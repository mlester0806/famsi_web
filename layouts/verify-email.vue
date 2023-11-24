<template>
    <client-only>
        <BaseVerifyingEmailIndicator />

        <div class="min-h-screen font-sans antialiased relative bg-gray-100">
      <div class="relative">
        <main class="text-neutral-800">
          <slot />
        </main>
      </div>
    </div>
    </client-only>
</template>