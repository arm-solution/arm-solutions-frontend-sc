import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { deleteAnnouncement, getAllAnnouncements } from '../../store/features/announcementSlice';
import DataTable from '../../components/DataTable';
import { deleteConfirmation } from '../../customs/global/alertDialog'; 

const AnnouncementList = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  const { data: allAnnouncements = [], loading: announcementLoading, message } = useSelector(state => state.announcement || {});

  useEffect(() => {
    dispatch(getAllAnnouncements());
  }, [dispatch]);

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Description', accessor: 'description' },
    { header: 'Date Posted', accessor: 'DATE_FORMAT(date_created, \"%M %d, %Y\")' },
  ];

  const handleDelete = async (id) => {
    deleteConfirmation({
      title: "",
      text: "",
      icon: "",
      confirmButtonText: "",
      cancelButtonText: "",
      deleteTitle: "",
      deleteText: "",
      successTitle: "", 
      successText: ""
    }, async () => {
      try {
        const { payload } = await dispatch(deleteAnnouncement(id));
        const result = payload.affectedRows > 0 || payload.success;
        console.log(result);
        if (result) {
          dispatch(getAllAnnouncements());
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error deleting announcement:", error);
        return false;
      }
    });
  };
  

  return (
    <>
      <br />
      {announcementLoading && <p>Loading announcements...</p>}
      {message && !announcementLoading && <p style={{ color: "red" }}>Error: {message}</p>}


      <DataTable
        data={Array.isArray(allAnnouncements) ? allAnnouncements : []}
        columns={columns}
        perPage={10}
        tableLabel="Announcement List"
        showAddButtonAndSearchInput={{ searchInput: true, addButton: false }}
        deleteAccess={true}
        actions={{ handleDelete }}
      />
    </>
  );
}

export default AnnouncementList;
