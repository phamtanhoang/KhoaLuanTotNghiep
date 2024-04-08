import React, { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
	className?: string;
	children: React.ReactNode;
};

const StickySidebar = ({ className, children }: Props): JSX.Element => {
	const sidebarElRef = useRef<HTMLDivElement>(null);
	const lastScrollingDirection = useRef<'down' | 'up'>('down');
	const lastScrollTop = useRef<number>(0);

	const [stickyPositions, setStickyPositions] = useState<{
		top: number;
		bottom: number;
		offsetTop: number;
		sidebarHeight: number;
	}>();
	const [scrollingDirection, setScrollingDirection] = useState<'up' | 'down'>('down');

	const onResizeHandler = useCallback(() => {
		calculateStickyPositions();
	}, []);

	const homePageOnScroll = useCallback(() => {
		const currentScroll = window.scrollY;

		if (currentScroll > lastScrollTop.current) {
			if (lastScrollingDirection.current !== 'down') {
				setScrollingDirection('down');
				lastScrollingDirection.current = 'down';
			}
		} else {
			if (lastScrollingDirection.current !== 'up') {
				setScrollingDirection('up');
				lastScrollingDirection.current = 'up';
			}
		}
		lastScrollTop.current = currentScroll;
	}, []);

	useEffect(() => {
		if (!sidebarElRef.current) return;
		calculateStickyPositions();

		// if your sidebar has dynamic data and you are fetching it and afterwards the height of the sidebar changes
		// you will need to add a size observer on the element to recalculate the sticky positions
		//
		new ResizeObserver(onResizeHandler).observe(sidebarElRef.current);
		new ResizeObserver(onResizeHandler).observe(window.document.body);
		window.addEventListener('scroll', homePageOnScroll);
		return () => {
			window.removeEventListener('scroll', homePageOnScroll);
		};
	}, [homePageOnScroll, onResizeHandler]);

	const calculateStickyPositions = () => {
		const sidebarEl = sidebarElRef.current as HTMLElement;
		const divMain = document.querySelector('main') as HTMLElement;

		if (!sidebarEl || !divMain) return;

		const height = sidebarEl.scrollHeight;
		const windowHeight = window.innerHeight;
		const offsetTop = divMain.offsetTop;

		const positions = {
			top: height + offsetTop > windowHeight ? height - windowHeight : -offsetTop,
			bottom: offsetTop + height - windowHeight,
			offsetTop: offsetTop,
			sidebarHeight: height
		};
		setStickyPositions(positions);
	};

	return (
		<aside className={'relative ' + className ? className : ''}>
			<div
				style={{
					height:
						stickyPositions &&
						sidebarElRef.current &&
						// add this check since sometimes error can occurr due to using stickyPositions values from state (that values have
						// delay related to real time value sidebarElRef.current.getBoundingClientRect().bottom)
						// ^^ that means if a sidebar changes a height due to some loaded content, and the sticky positions state is not updated
						// fast enough, this will cause a sidebar to SOMETIMES be moved down a little bit cause sidebarElRef.current.scrollHeight
						// is not the same as the height in the state (stickyPositios.sidebarHeight)

						//with this check, we wait for state to be updated and then perform the calculation
						stickyPositions.sidebarHeight === sidebarElRef.current.scrollHeight
							? stickyPositions.sidebarHeight + stickyPositions.offsetTop > window.innerHeight
								? window.scrollY -
								  Number(stickyPositions?.top) -
								  Number(stickyPositions?.offsetTop) -
								  window.innerHeight +
								  Number(sidebarElRef.current?.getBoundingClientRect().bottom)
								: window.scrollY
							: 0
				}}
			></div>
			<div
				ref={sidebarElRef}
				className="sticky flex w-full flex-col"
				style={{
					top:
						stickyPositions?.top && scrollingDirection === 'down'
							? -Number(stickyPositions.top)
							: undefined,
					bottom:
						stickyPositions?.bottom && scrollingDirection === 'up'
							? -Number(stickyPositions.bottom)
							: undefined
				}}
			>
				{children}
			</div>
		</aside>
	);
};

export default StickySidebar;
