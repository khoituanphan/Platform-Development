'use client';

import React from 'react';
import { useParams } from 'next/navigation';

const ProjectPage = () => {
	const { project_id } = useParams();
	return <div>{project_id}</div>;
};

export default ProjectPage;
