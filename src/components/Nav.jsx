import React from 'react'

function Nav(props) {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed">
                <h1 className="navbar-brand" style={{ fontSize: '25px', marginRight: '50px' }}>PathFinder</h1>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {
                                props.status.isrunning === 0 && props.status.iscleared === 1 && props.status.isdone === 0 ?
                                    <h5 className="navbar-brand hovering" style={{ cursor: 'pointer' }} onClick={() => props.click()}>Visualize<span className="sr-only"></span></h5>
                                    :
                                    <h5 className="nav-link" style={{ opacity: '50%' }}>Visualize</h5>

                            }

                        </li>
                        <li className="nav-item">
                            {
                                props.status.isrunning === 0 && props.status.iscleared === 0 && props.status.isdone === 1 ?
                                    <h5 className="navbar-brand hovering" style={{ cursor: 'pointer' }} onClick={() => props.clear()}>Clear Path<span className="sr-only"></span></h5>
                                    :
                                    <h5 className="nav-link" style={{ opacity: '50%' }}>Clear All</h5>

                            }

                        </li>

                        <li>

                            <h5 className="navbar-brand" style={{marginLeft:"20px"}}>Create Walls</h5>

                        </li>

                        <li>
                            {

                                <input type="checkbox" className="form-check-input" id="createwalls" checked={props.can_create_walls} onClick={()=>props.canCreateWalls()} style={{ width:'20px', height:'20px', marginLeft:"-10px", marginTop:"10px"}} />
                               
                            }   

                        </li>

                        <li className="nav-item">
                            {
                                props.status.isrunning === 0 && props.status.iscleared === 1 && props.status.isdone === 0 ?
                                    <h5 className="navbar-brand hovering" style={{ cursor: 'pointer', marginLeft: '30px' }} onClick={() => props.clear_allwalls()}>Clear Walls<span className="sr-only"></span></h5>
                                    :
                                    <h5 className="nav-link" style={{ opacity: '50%', marginLeft: '20px' }}>Clear Walls</h5>

                            }

                        </li>

                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Nav