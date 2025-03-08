import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { deleteAnnouncement, getAllAnnouncements } from '../../store/features/announcementSlice';
import DataTable from '../../components/DataTable';
import { deleteConfirmation } from '../../customs/global/alertDialog'; 
import { dateFormat } from '../../customs/global/dateFormat';

const AnnouncementList = () => {
  const dispatch = useDispatch();
  const [expandedRows, setExpandedRows] = useState({});

  const { data: allAnnouncements = [], loading: announcementLoading, message } = useSelector(state => state.announcement || {});

  useEffect(() => {
    dispatch(getAllAnnouncements());
  }, [dispatch]);

  const toggleExpand = (id) => {
    console.log('Toggling expand for id:', id);
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const formattedAnnouncements = allAnnouncements.map(announcement => ({
    ...announcement,
    date_created: dateFormat(announcement.date_created),
    short_description: announcement.description.length > 100
      ? `${announcement.description.slice(0, 100)}... `
      : announcement.description,
    isExpanded: expandedRows[announcement.id] || false
  }));

  const columns = [
    { header: 'Title', accessor: 'title' },
    { 
      header: 'Description', 
      accessor: 'description',
      cell: (row) => (
        <>
          {row.isExpanded ? row.description : row.short_description}
          {row.description.length > 100 && row.id && (
            <span 
              style={{ color: 'blue', cursor: 'pointer' }} 
              onClick={() => toggleExpand(row.id)}
            >
              {row.isExpanded ? ' See less' : ' See more'}
            </span>
          )}
        </>
      )
    },
    { header: 'Date Posted', accessor: 'date_created' },
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
        data={Array.isArray(formattedAnnouncements) ? formattedAnnouncements : []}
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
