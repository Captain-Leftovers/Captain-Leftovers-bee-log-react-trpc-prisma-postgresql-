import { useLocation, useNavigate } from 'react-router-dom'

export default function HiveSvg({
	hiveNumber,
	hiveId,
}: {
	hiveNumber: number
	hiveId: string
}) {
	const navigate = useNavigate()
	const location = useLocation()

	
	return (
		<div className="">
			<p className='text-2xl'>{}</p>
			<svg
				onClick={() => {
					if(location.pathname.includes('details')) return
					navigate(
						`details/${hiveId}/${hiveNumber}`
					)
				}}
				className="-z-10 transform cursor-pointer transition duration-500 ease-in-out hover:scale-110 hover:shadow-2xl hover:shadow-green-100 "
				width="100"
				height="100"
				viewBox="0 0 210 210"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g id="appHive">
					<g
						id="beehive 2"
						clip-path="url(#clip0_38_488)"
					>
						<g id="Group">
							<g id="Group_2">
								<path
									id="Vector"
									d="M33.9088 117.773H168.486C170.882 117.773 173.179 116.821 174.873 115.127C176.568 113.433 177.519 111.136 177.519 108.74C177.519 106.344 176.568 104.046 174.873 102.352C173.179 100.658 170.882 99.7065 168.486 99.7065H33.9088C31.513 99.7065 29.2154 100.658 27.5213 102.352C25.8272 104.046 24.8755 106.344 24.8755 108.74C24.8755 111.136 25.8272 113.433 27.5213 115.127C29.2154 116.821 31.513 117.773 33.9088 117.773Z"
									fill="#2A9D8F"
								/>
								<path
									id="Vector_2"
									d="M166.642 117.773H35.7529V187.642C35.7529 189.209 36.3751 190.711 37.4828 191.819C38.5904 192.926 40.0927 193.549 41.6591 193.549H160.744C162.31 193.549 163.813 192.926 164.92 191.819C166.028 190.711 166.65 189.209 166.65 187.642V117.773H166.642Z"
									fill="#E9C46A"
								/>
								<path
									id="Vector_3"
									d="M154.846 137.499V129.571H47.5491V137.499L53.4553 143.405H148.94L154.846 137.499Z"
									fill="#F4A261"
								/>
								<path
									id="Vector_4"
									d="M33.9088 23.9377H168.486C170.882 23.9377 173.179 22.9859 174.873 21.2919C176.568 19.5978 177.519 17.3002 177.519 14.9044C177.519 12.5086 176.568 10.2109 174.873 8.51688C173.179 6.82281 170.882 5.87109 168.486 5.87109H33.9088C32.7226 5.87109 31.5479 6.10475 30.4519 6.55871C29.356 7.01268 28.3601 7.67806 27.5213 8.51688C26.6825 9.3557 26.0171 10.3515 25.5632 11.4475C25.1092 12.5435 24.8755 13.7181 24.8755 14.9044C24.8755 17.3002 25.8272 19.5978 27.5213 21.2919C29.2154 22.9859 31.513 23.9377 33.9088 23.9377Z"
									fill="#2A9D8F"
								/>
								<path
									id="Vector_5"
									d="M166.642 23.9377H35.7511V99.7067H166.642V23.9377Z"
									fill="#E9C46A"
								/>
								<path
									id="Vector_6"
									d="M154.846 43.6629V35.7354H47.5491V43.6629C49.846 45.9679 51.1453 47.2591 53.4553 49.5691H148.94C151.248 47.2591 152.541 45.9679 154.846 43.6629Z"
									fill="#F4A261"
								/>
								<g id="Group_3">
									<path
										id="Vector_7"
										d="M139.911 210.129H154.659V193.542H131.062L139.911 210.129Z"
										fill="#2A9D8F"
									/>
									<path
										id="Vector_8"
										d="M62.4837 210.129H47.7361V193.542H71.3333L62.4837 210.129Z"
										fill="#2A9D8F"
									/>
								</g>
							</g>
						</g>
						<g id="numberFrame">
							<g id="numberFrame_2">
								<rect
									width="100"
									height="30"
									transform="matrix(-1 0 0 1 150 58.5)"
									fill="#E76F51"
								/>
								<text
									dominant-baseline="middle"
									text-anchor="middle"
									fill="white"
									font-size="25"
									font-weight="bold"
									transform="matrix(1 0 0 1 100 75)"
								>
									{
										hiveNumber
									}
								</text>
							</g>
							<rect
								width="72"
								height="21"
								transform="matrix(-1 0 0 1 137 63)"
								stroke="#2A9D8F"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-dasharray="1 1"
							/>
						</g>
					</g>
				</g>
				<defs>
					<clipPath id="clip0_38_488">
						<rect
							width="210"
							height="210"
							fill="white"
							transform="matrix(-1 0 0 1 210 0)"
						/>
					</clipPath>
				</defs>
			</svg>
		</div>
	)
}
