import React from 'react'
import { Alert } from 'react-bootstrap'

function ErrorMessage() {
  return (
    <Alert key="danger" variant="danger">
    Product not found!
    </Alert>
  )
}

export default ErrorMessage