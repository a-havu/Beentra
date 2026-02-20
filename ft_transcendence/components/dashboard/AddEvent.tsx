
"use client"

import { useState } from "react"
import { useEffect } from "react"
import CreateEvent from "../events/CreateEvent"
import { Button } from "../ui/Button"

const AddEvent = () => {
	const [showModal, setShowModal] = useState(false);

	const handleAdd = () => {

	}

	return (
		<Button
			variant="adding"
			onClick={() => setShowModal(true)}
			>
			Add Event
		</Button>
	)
}

export default AddEvent;
