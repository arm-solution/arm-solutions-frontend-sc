import React, { useState, useEffect, useRef } from "react";
import "./Client.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllCleints, deleteClient } from "../../../store/features/clientsSlice";
import DataTable from "../../../components/DataTable";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import ClientDetails from "../../../components/modals-forms/clients-details-modal/ClientDetails";
import { deleteConfirmation } from "../../../customs/global/alertDialog";
import { addNotification, getNotification } from "../../../store/features/notificationSlice";
import { connectNotificationSocket } from "../../../customs/global/notificationSocket";

const Client = () => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const [selectedClient, setSelectedClient] = useState({
    name: "",
    address: "",
    contact_number: "",
    email: "",
  });

  const { data: allClient } = useSelector((state) => state.clients);
  const { notByUserIdList } = useSelector((state) => state.notification);

  const userId = 67; // replace with auth in real app

  // ───── LOAD DATA & CONNECT SOCKET ─────
  useEffect(() => {
    dispatch(getAllCleints());
    dispatch(getNotification(userId));

    // Connect to WebSocket / Socket.IO
    connectNotificationSocket(dispatch, userId);
  }, [dispatch]);

  // ───── LOG NOTIFICATIONS ─────


  // ───── TABLE COLUMNS ─────
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Contact Number", accessor: "contact_number" },
    { header: "Email", accessor: "email" },
  ];

  // ───── MODAL HANDLERS ─────
  const handleView = (client) => {
    if (client) {
      const modalElement = modalRef.current;
      const modal = new Modal(modalElement);
      setSelectedClient(client);
      modal.show();
    } else {
      console.error("No Client Selected!");
    }
  };

  const handleDelete = (id) => {
    deleteConfirmation({}, async () => {
      const { payload } = await dispatch(deleteClient(id));
      const result = payload.affectedRows > 0;
      dispatch(getAllCleints());
      return result;
    });
  };

  const addClientModal = () => {
    const modalElement = modalRef.current;
    const modal = new Modal(modalElement);
    setSelectedClient({ name: "", address: "", contact_number: "", email: "" });
    modal.show();
  };

  return (
    <>
      <DataTable
        data={Array.isArray(allClient) ? allClient : []}
        columns={columns}
        actions={{ handleView, handleDelete }}
        perPage={10}
        showAddButtonAndSearchInput={{ searchInput: true, addButton: true }}
        deleteAccess={true}
        tableLabel="Clients list"
        addData={addClientModal}
      />

      <ClientDetails
        modalRef={modalRef}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
      />
    </>
  );
};

export default Client;
