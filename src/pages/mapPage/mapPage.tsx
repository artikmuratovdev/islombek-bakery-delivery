import { useGetClientsMapQuery, useMeQuery } from '@/app/api'
import { Avatar, AvatarFallback, AvatarImage } from '@/components'
import { Notifications } from '@/icons'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import { GetClientsMapResponse } from '@/app/api/clients/type'

const TileLayerControl = ({
	clientsMap,
	position,
	hybridTile,
	setHybridTile,
}: {
	clientsMap: GetClientsMapResponse[]
	position: [number, number]
	hybridTile: boolean
	setHybridTile: (value: boolean) => void
}) => {
	const map = useMap()

	useEffect(() => {
		map.setView(
			clientsMap?.length
				? [
						+(
							clientsMap.reduce((a, b) => a + b.address.lat, 0) /
							clientsMap.length
						).toFixed(6),
						+(
							clientsMap.reduce((a, b) => a + b.address.lng, 0) /
							clientsMap.length
						).toFixed(6),
				  ]
				: position,
			map.getZoom()
		)
	}, [clientsMap, position, map])

	return (
		<div
			style={{
				position: 'absolute',
				bottom: '10px',
				left: '10px',
				zIndex: 1000,
				background: 'white',
				padding: '8px',
				borderRadius: '5px',
				boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<input
				type='checkbox'
				checked={hybridTile}
				onChange={e => {
					setHybridTile(e.target.checked)
					map.invalidateSize()
				}}
				style={{ marginRight: '5px', scale: '1.5' }}
			/>
			<label style={{ fontSize: '14px', fontWeight: 'bold', color: 'black' }}>
				Hybrid
			</label>
		</div>
	)
}

export function LeafletMap() {
	const navigate = useNavigate()
	const { data: clientsMap } = useGetClientsMapQuery({})

	const [position, setPosition] = useState<[number, number]>(
		clientsMap?.length
			? [
					+(
						clientsMap.reduce((a, b) => a + b.address.lat, 0) /
						clientsMap.length
					).toFixed(6),
					+(
						clientsMap.reduce((a, b) => a + b.address.lng, 0) /
						clientsMap.length
					).toFixed(6),
			  ]
			: [37.240232, 67.286938]
	)
	const [rotation, setRotation] = useState(0)
	const [hybridTile, setHybridTile] = useState(false)

	useEffect(() => {
		const watcher = navigator.geolocation.watchPosition(
			pos => {
				setPosition([pos.coords.latitude, pos.coords.longitude])
				setRotation(prev => pos.coords.heading || prev)
			},
			err => {
				console.error('Geolocation error:', err)
			},
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
		)

		return () => navigator.geolocation.clearWatch(watcher)
	}, [rotation])

	const { data } = useMeQuery()

	return (
		<>
			<div className='border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 w-full'>
				<div className='flex w-[95%] m-auto justify-between items-center'>
					<div
						className='flex gap-x-2 items-center'
						onClick={() => navigate('/profile')}
					>
						<Avatar>
							<AvatarImage
								className='w-10 h-10'
								src='https://github.com/shadcn.png'
								alt='Avatar'
							/>
							<AvatarFallback>Sardor</AvatarFallback>
						</Avatar>
						<h2 className='text-white text-xl font-semibold font-inter'>
							{data?.fullName}
						</h2>
					</div>
					<button onClick={() => navigate('/notifications')}>
						<Notifications className='cursor-pointer text-[#FFCC15] w-6 h-6' />
					</button>
				</div>
			</div>

			<div className='w-[95%] h-[74vh] mx-auto mt-24'>
				<MapContainer
					center={position}
					zoom={16}
					style={{ height: '100%', width: '100%' }}
					scrollWheelZoom={true}
				>
					<TileLayerControl
						clientsMap={clientsMap || []}
						position={position}
						hybridTile={hybridTile}
						setHybridTile={setHybridTile}
					/>

					<TileLayer
						attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
						url={`https://{s}.google.com/vt/lyrs=${
							hybridTile ? 's,h' : 'm'
						}&x={x}&y={y}&z={z}`}
						subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
						maxZoom={20}
					/>

					{clientsMap?.length &&
						clientsMap.map(clientMap => (
							<Marker
								key={clientMap._id}
								position={[clientMap.address.lat, clientMap.address.lng]}
							>
								<Popup>
									<div className='font-[600] text-[16px]'>
										{clientMap.fullName} {clientMap.phone}
									</div>
								</Popup>
							</Marker>
						))}
				</MapContainer>
			</div>
		</>
	)
}
