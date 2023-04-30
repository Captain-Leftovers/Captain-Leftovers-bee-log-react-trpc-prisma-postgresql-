import ActionSVG from './common/ActionSVG'

export default function Home() {
	return (
		<div className="flex h-full flex-col ">
			<section className=" py-4 sm:py-8 ">
				<div className="container mx-auto flex flex-col items-center px-2">
					<h2 className="text-2xl font-semibold  md:text-3xl">
						Welcome to BeeKeepers' Log
					</h2>
					<ul className=''>
						<li className='custom-li'>
							<p className=" md:text-xl">
								the all-in-one
								solution for
								beekeepers to
								manage farms,
								hives, and
								inspections.
							</p>
						</li>
						<div className="container">
							<ActionSVG />
						</div>
					
						<li className='custom-li'>
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
						<li className='custom-li'>
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
