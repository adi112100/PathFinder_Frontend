import React, { useState, useEffect } from 'react'
import Axios from "axios"

import path1 from './path1'
import path2 from './path2'
import path3 from './path3'

import Grid from './Grid'
import Nav from './Nav';

function Main() {
    const [paths, fetchPath] = useState({ streamnodes: [], shortest_path: [] });
    const [ispathfinded, SetStatus] = useState(0)
    const [startNode, setStartNode] = useState(1575)
    const [can_create_walls, setWallStatus] = useState(false)
    const [status, setStatus] = useState({
        isrunning: 0,
        iscleared: 1,
        isdone: 0
    })

    const [mousepressed, presStatus] = useState(false)
    const [walls, addWalls] = useState([])

    // useEffect(
    //     ()=>{
    //         console.log(can_create_walls)
    //     },[can_create_walls]
    // )

    // useEffect(
    //     ()=>{
    //         console.log(mousepressed)
    //     },[mousepressed]
    // )

    // useEffect(
    //     ()=>{
    //         console.log(walls)
    //     },[walls]
    // )

    useEffect(
        () => {
            
            // console.log(paths.shortest_path)
            traverse_path()


        }, [paths]
    )

    useEffect(
        () => {
            console.log(startNode)
            document.getElementById(startNode).style.backgroundColor = 'black'
            document.getElementById(1590).style.backgroundColor = 'black'
            document.getElementById(1590).innerHTML = '<i class="fas fa-genderless end"></i>'

        }, [startNode]

    )

    function mousedown() {
        presStatus(true)
    }

    function mouseup() {
        presStatus(false)
    }

    function changeStartNode(nodeID) {

        if (status.isrunning === 0 && status.iscleared === 1 && status.isdone === 0 && walls.indexOf(nodeID) === -1) {
            document.getElementById(startNode).style.backgroundColor = 'white'
            document.getElementById(nodeID).style.backgroundColor = 'black'
            setStartNode(nodeID)
        }
    }

    function canCreateWalls() {
        if (status.isrunning === 0 && status.iscleared === 1 && status.isdone === 0) {
            var temp = can_create_walls
            setWallStatus(!temp)
        }

    }

    // add walls in list when mouseis click and mouse is over element
    function addwalls(nodeID) {

        if (mousepressed && can_create_walls && nodeID !== 1590 && nodeID !== startNode) {
            if (walls.indexOf(nodeID) === -1) {
                addWalls([...walls, nodeID])
                document.getElementById(nodeID).classList.add('wallsanimation')
            }
            else {
                var tempwalls = walls
                tempwalls.splice(walls.indexOf(nodeID), 1)
                document.getElementById(nodeID).classList.remove('wallsanimation')
                addWalls(tempwalls)
            }
            // console.log(walls)
        }

    }

    // add walls in list when mouseis click 
    function addwalls_1(nodeID) {

        if (can_create_walls && nodeID !== 1590 && nodeID !== startNode) {
            if (walls.indexOf(nodeID) === -1) {
                addWalls([...walls, nodeID])
                document.getElementById(nodeID).classList.add('wallsanimation')
            }
            else {
                var tempwalls = walls
                tempwalls.splice(walls.indexOf(nodeID), 1)
                document.getElementById(nodeID).classList.remove('wallsanimation')
                addWalls(tempwalls)
            }
            // console.log(walls)
        }

    }

    function clear_allwalls() {
        console.log('executed', walls.length)
        for (var i = 0; i < walls.length; ++i) {
            document.getElementById(walls[i]).classList.remove('wallsanimation')
        }
        addWalls([])
    }

    function create_predefine_path(pathname)
    {
        if (pathname==='default') return
        else if(pathname==='path1') pathname = path1
        else if(pathname==='path2') pathname = path2
        else if(pathname==='path3') pathname = path3


        clear_allwalls()
        changeStartNode(0)
        addWalls(pathname)
        for(let i=0; i< pathname.length; ++i)
        {
            
            document.getElementById(pathname[i]).classList.add('wallsanimation')
        }
        // console.log(walls)
        
    }




    function clicked(algorithm) {

        if (status.isrunning === 0 && status.iscleared === 1 && status.isdone === 0) {

            document.getElementById('loader').classList.remove('hide')
            setStatus({ isrunning: 1, iscleared: 0 })
            Axios.post(`https://adityamorankar-pathfinder.herokuapp.com/${algorithm}/40/90/${startNode}/1590/`,
                {
                    'walls': JSON.stringify(walls)
                })
                .then(response => {
                    const streamnodes = JSON.parse(response.data.streamnodes)
                    const shortest_path = JSON.parse(response.data.shortest_path)

                    fetchPath(
                        {
                            streamnodes: streamnodes,
                            shortest_path: shortest_path
                        })
                })
                .then(
                    ()=>  document.getElementById('loader').classList.add('hide')
                )
        }





    }

    function traverse_path() {

        for (let i = 0; i < paths.streamnodes.length; ++i) {
            let isdone = 0
            setTimeout(
                () => {
                    
                    document.getElementById(paths.streamnodes[i]).classList.add("visitedpath");
                    // console.log(paths.streamnodes[])
                    if (i === paths.streamnodes.length - 1) {
                        isdone = 1
                        SetStatus(1)
                    }
                    if (isdone === 1) {
                        setTimeout(final_path, 2000)

                    }
                },
                35 * i
            )
        }



        return 0
    }


    function final_path() {

        if (paths.shortest_path.length === 0) {
            setStatus({ isrunning: 0, iscleared: 0, isdone: 1 })
        }
        for (let i = 0; i < paths.shortest_path.length; ++i) {
            setTimeout(
                () => {
                    document.getElementById(paths.shortest_path[i]).classList.add("shortestpath");
                    // console.log(paths.shortest_path[i])
                    if (i === paths.shortest_path.length - 1) {
                        setStatus({ isrunning: 0, iscleared: 0, isdone: 1 })
                    }
                },
                25 * i
            )
        }

        return 0

    }

    function clear_path() {

        setStatus({ isrunning: 0, iscleared: 1, isdone: 0 })
        for (let i = 0; i < paths.streamnodes.length; ++i) {
            document.getElementById(paths.streamnodes[i]).classList.remove("visitedpath");
        }

        for (let i = 0; i < paths.shortest_path.length; ++i) {
            document.getElementById(paths.shortest_path[i]).classList.remove("shortestpath");
        }




    }



    var row_lst = []
    var col = 90
    var row = 40
    for (var i = 0; i < row; ++i) row_lst.push(i * col)
    return (

        <div>
            <Nav click={clicked} clear={clear_path} status={status} canCreateWalls={canCreateWalls} can_create_walls={can_create_walls} clear_allwalls={clear_allwalls} create_predefine_path={create_predefine_path} />
            <div className="matrix shadow">
                {
                    row_lst.map(x =>
                        <Grid key={x} startvalue={x} col={col} changeStartNode={changeStartNode} addwalls={addwalls} addwalls_1={addwalls_1} mousedown={mousedown} mouseup={mouseup} />)
                }
            </div>


        </div>
    )
}

export default Main
