'use client';

import React, { useState, useEffect } from 'react';
import {
	Box,
	Flex,
	Text,
	Button,
	Grid,
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Heading,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const NavCard = ({ title, asset }) => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const onClick = async () => {
		setLoading(true);
		const res = await fetch('/api/assets/grab', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				assetID: asset._id,
			}),
		});
		const data = await res.json();
		console.log(res);
		console.log(data);
		router.push(`/render/${data.body.modelID}`);
		setLoading(false);
	};
	return (
		<Card backgroundColor={'gray.500'} margin="32px" width={'350px'}>
			<CardHeader>
				<Heading>{title}</Heading>
			</CardHeader>
			<CardBody>Click view to see the {title} asset</CardBody>
			<CardFooter>
				<Button disabled={loading} onClick={onClick}>
					View
				</Button>
			</CardFooter>
		</Card>
	);
};

const TestHome = () => {
	const [assets, setAssets] = useState([]);
	useEffect(() => {
		const getAssets = async () => {
			const res = await fetch('/api/assets/grab');
			const data = await res.json();
			console.log(data);
			setAssets(data.body.assets);
		};

		getAssets();
	}, []);

	return (
		<Grid padding="0 32px" templateColumns="200px auto">
			<Box>Whaever</Box>
			<Box>
				<Box height={'100px'} />
				<Heading>Welcome to ARIS</Heading>
				<Box height={'100px'} />
				<Heading>Try our assets</Heading>
				<Flex>
					{assets.map((asset, i) => {
						return (
							<NavCard
								title={asset.name}
								action="View"
								key={`asset-${i}`}
								asset={asset}
							/>
						);
					})}
					{/* <NavCard title="User" action="User" /> */}
				</Flex>
			</Box>
		</Grid>
	);
};

export default TestHome;
