import React from 'react'

function Grid(props) {
    var col_lst = []
    var col = props.col
    for (var i = 0; i < col; ++i) col_lst.push(i + props.startvalue)
    
    return (
        <div className="nodes">
            {
                col_lst.map((x) => <div key={x} id={x} 
                    onDoubleClick={()=>{props.changeStartNode(x)}} 
                    onClick={()=>props.addwalls_1(x)}
                    onMouseOver={()=>props.addwalls(x)}
                    onMouseDown={()=> props.mousedown()}
                    onMouseUp={()=> props.mouseup()}
                    className="flexnode" style={{ width: "20px", height: "20px", margin: "0px" }} ></div>)
            }
        </div>
    )
}

export default Grid
