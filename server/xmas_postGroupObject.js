

xmas_postGroupObject = (req, res, next) => {

    // next()

    const express = require('express');
    const app = express();
    const axios = require('axios');
    const pg = require('pg');
    const cors = require('cors');
    const bodyParser = require('body-parser');


    function done() {
        // Close the connection to the database
    }



    console.log("---------------------- New XMAS POST Group Object Check Cycle --------------------")

    console.log(req.body)

    const name          = req.body.name
    const participants   = req.body.participants
    const description   = req.body.description
    const timestamp     = req.body.timestamp

    console.log("this is in the middle")

    // const query = `SELECT * FROM gifts_data LEFT JOIN xmas_groups on xmas_groups.id = gifts_data.group_id WHERE group_id = ($1) ORDER BY details DESC`;


    const query = `INSERT INTO xmas_groups(name, participants, description, created_at) VALUES ($1, $2, $3, $4) RETURNING id`;

    // console.log("this shit right here is the group id: " + xmas_group_id)

    const values = [name, participants, description, timestamp];

    global.client.query(query, values, (err, result) => {
        console.log("the query function is running Pt1 ")
        done();
        console.log("the query function is running Pt2 ")

        if (err) {
            console.error('Error running query' + err);
            res.status(500).send('Error running query');
            console.log("this is the result: ")
            return
        }
        // console.log("Successful post nice work")
        // console.log(result)
        // console.log("Successful post nice work pt 2")
        // console.log(result.rows)
        // console.log("Successful post nice work pt 3")
        // console.log(result.values)
        // console.log("Successful post nice work pt 4")

        console.log("THIS IS THE RESULTING ID")

        console.log(result.rows[0].id)

        res.send(result.rows)
        // return
    });
    // });
    console.log("this is after the post method on the server")
}

module.exports = xmas_postGroupObject
