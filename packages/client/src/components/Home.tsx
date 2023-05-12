import ActionSVG from './common/ActionSVG'

export default function Home() {
	return (
		<div className="flex h-full flex-col  ">
			
			<section className=" py-4 sm:py-8 h-full">
				<div className="h-full mx-auto flex flex-col items-center px-2">
					<h2 className="text-2xl font-semibold  md:text-3xl">
						Welcome to BeeKeepers' Log
					</h2>
					<ul className="flex flex-col items-center h-full md:gap-4">
						<li className="custom-li pr-[2rem]">
							<p className=" md:text-xl">
								the all-in-one
								solution for
								beekeepers to
								manage farms,
								hives, and
								inspections.
							</p>
						</li>
						<div className="container md:order-last md:w-2/5">
							<ActionSVG />
						</div>

						<li className="custom-li pr-[2rem]">
							<p className=" md:text-xl">
								Our
								user-friendly
								platform helps
								you keep track
								of your hives'
								health and
								productivity by
								streamlining the
								process of
								logging
								inspections.
								<br></br>
							</p>
						</li>
						<li className="custom-li pr-[2rem] md:text-xl">
							<p>
								With BeeKeeper's
								log you'll have
								easy access to
								your beekeeping
								data, enabling
								you to make
								informed
								decisions for
								the well-being
								of your bees
							</p>
						</li>
					</ul>
				</div>
			</section>
		</div>
	)
}

