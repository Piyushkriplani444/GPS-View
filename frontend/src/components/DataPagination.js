import React, { useState } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useNavigate } from "react-router-dom";
const DataPagination = (props)=>{
     const history= useNavigate();
    const [currentPage , setCurrentPage] = useState(props.currentPage);
    const { pageSize  , pageCount , data} = props;
     const handleClick = (e,index)=>{
        e.preventDefault();
       setCurrentPage(index);
     }

    let pageNumbers = [];
    for (let i = 0; i < pageCount; i++) {
      pageNumbers.push(
        <PaginationItem key={i} active={currentPage === i ? true : false}>
          <PaginationLink onClick={e => handleClick(e, i)} href="#">
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
    const paginatedData = data.slice(
        currentPage * pageSize,
        (currentPage + 1) * pageSize
      );

      const openDetailpage = (id,type)=>{
          const detaildata= data.filter(d=>  d.DeviceId === id && d['Device Type'] === type );
          history("/detailpage",{
            state: {
              data :detaildata 
            }
          });
      }
  return (
    <React.Fragment>
           {paginatedData.map((gdata,index) => (
                        <tr key={index}>
                          <td>{gdata.DeviceId}</td>
                          <td>{gdata['Device Type']}</td>
                          <td>{gdata.Timestamp}</td>
                          <td>{gdata.location}</td>
                          <td><p type="button" onClick={()=>openDetailpage(gdata.DeviceId,gdata['Device Type'])}> ➡ </p></td>
                          </tr>
                ))}
    <React.Fragment>
      <Pagination aria-label="Page navigation example">
        <PaginationItem>
          <PaginationLink
            onClick={e => handleClick(e, currentPage - 1)}
            previous
            href="#"
          />
        </PaginationItem>
        {pageNumbers}

        <PaginationItem disabled={currentPage >= pageCount - 1}>
          <PaginationLink
            onClick={e => handleClick(e, currentPage + 1)}
            next
            href="#"
          />
        </PaginationItem>
      </Pagination>
    </React.Fragment>
  </React.Fragment>
  )
}

export default DataPagination;
