import React from 'react'
import { Container, Table } from 'react-bootstrap'

const Quoteslist = () => {
    return (
        <div className='quotestables'>
            <Container>
                <Table className='quote_table mt-3' striped bordered hover>
                    <thead>
                        <tr>
                            <th>LOB</th>
                            <th>Company Name</th>
                            <th>Policy Price</th>
                            <th>Benefits</th>
                            <th>Repair Type</th>
                            <th>Plan Nature</th>
                            <th>Instant Policy</th>
                            <th>Get it</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                                <tr>
                                    <td>dmfknd</td>
                                    <td>dmfknd</td>
                                </tr>
                            </td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default Quoteslist