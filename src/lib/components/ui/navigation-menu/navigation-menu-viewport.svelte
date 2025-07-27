<script lang="ts">
	import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: NavigationMenuPrimitive.ViewportProps = $props();
</script>

<div class={cn('left-0 absolute top-full isolate z-50 flex justify-center')}>
	<NavigationMenuPrimitive.Viewport
		bind:ref
		data-slot="navigation-menu-viewport"
		class={cn(
			'origin-top-center mt-1.5 shadow md:w-[var(--bits-navigation-menu-viewport-width)] relative h-[var(--bits-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90',
			className
		)}
		{...restProps}
	/>
</div>
