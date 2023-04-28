import ActionSVG from './common/ActionSVG'
import DaisyTag from './common/DaisyTag'

export default function Home() {
	return (
		<div className="flex h-full flex-col ">
			<section className=" py-4 sm:py-8">
				<div className="container mx-auto flex flex-col px-4">
					<h2 className="text-2xl font-semibold  md:text-3xl">
						Welcome to BeeKeepers' Log
					</h2>
						
							<DaisyTag className="h-6 bg-red-400"  />
						<p className=" flex px-2  md:text-xl">
							the all-in-one solution
							for beekeepers to manage
							farms, hives, and
							inspections.
						</p>
					<div className="container">
						<ActionSVG />
					</div>
		
						<DaisyTag className="h-6" />
						<p className="md:text-xl flex">
							Our user-friendly
							platform helps you keep
							track of your hives'
							health and productivity
							by streamlining the
							process of logging
							inspections.<br></br>{' '}
							With BeeKeeper's log
							you'll have easy access
							to your beekeeping data,
							enabling you to make
							informed decisions for
							the well-being of your
							bees
						</p>
				</div>
			</section>
		</div>
	)
}
