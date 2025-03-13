import React, { useContext, useEffect, useState } from "react";
import 'react-native-reanimated';
import { FlatList } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import {
    ActionsContainer, ButtonSearch,
    BuyButton,
    Container, EmptyText, Form, HeaderText, Input, RemoveButton,
    RowText, TableContainer, TableHeader, TableRow
} from "./style";

import Title from "@/components/Title";
import FooterMenu from "@/components/FooterMenu";
import Button from "@/components/Button";
import Config from "@/components/Config";
import { AuthContext } from "@/context/AuthProvider";
import { Controller, useForm } from "react-hook-form";
import { api } from "@/api/axios";
import { router } from "expo-router";
import { ListEmptyText } from "../home/styles";
import { useAuth } from "@/hooks/useAuth";
import { AutoHideAlert } from "@/components/AutoHideAlert";
import ConfirmAlert from "@/components/ConfirmAlert";

interface Cliente {
    _id: string;
    name: string;
    email: string;
}
interface Venda {
    _id: string;
    clienteId: string;
}

function Cliente() {
    const { checkToken } = useAuth();
    const { tokenState } = useContext(AuthContext);
    const { control, handleSubmit, setValue, getValues } = useForm();

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
    const [clienteToDelete, setClienteToDelete] = useState<string | null>(null);
    const [confirmAlertVisible, setConfirmAlertVisible] = useState<boolean>(false);

    checkToken();

    const fetchClientes = async () => {
        if (!tokenState) {
            return;
        }

        try {
            const response = await api.get("/person", {
                headers: {
                    Authorization: `Bearer ${tokenState}`,
                },
            });

            setClientes(response.data);
            setFilteredClientes(response.data);
        } catch (error) {
            setAlertMessage("Erro ao buscar clientes");
            setTimeout(() => {
                setAlertMessage("");
            }, 1000);
            setConfirmAlertVisible(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (tokenState) {
            fetchClientes();
        }
    }, [tokenState]);

    const handleSearch = () => {
        const searchTerm = getValues("searchTerm");

        if (searchTerm === "") {
            setFilteredClientes(clientes);
        } else {
            const filtered = clientes.filter((cliente) =>
                cliente.name.toLowerCase().startsWith(searchTerm.toLowerCase())
            );

            setFilteredClientes(filtered);
        }
    };

    const deleteVendasByCliente = async (clienteId: string) => {
        try {
            const vendasResponse = await api.get('/supply', {
                headers: {
                    Authorization: `Bearer ${tokenState}`,
                },
                params: { clienteId },
            });

            if (vendasResponse.status === 200) {

                const vendasDoCliente = vendasResponse.data.filter((venda: Venda) => venda.clienteId === clienteId);


                for (let venda of vendasDoCliente) {
                    try {
                        const deleteResponse = await api.delete(`/supply/${venda._id}`, {
                            headers: {
                                Authorization: `Bearer ${tokenState}`,
                            },
                        });

                        if (deleteResponse.status !== 200) {
                            setAlertMessage(`Erro ao excluir venda com ID ${venda._id}`);
                            setTimeout(() => {
                                setAlertMessage("");
                            }, 2000);
                            setConfirmAlertVisible(false);

                        }
                    } catch (deleteError) {
                        setAlertMessage(`Erro ao excluir venda com ID ${venda._id}`);
                        setTimeout(() => {
                            setAlertMessage("");
                        }, 2000);
                        setConfirmAlertVisible(false);
                    }
                }
            } else {
                setAlertMessage(`Erro ao buscar vendas`);
                setTimeout(() => {
                    setAlertMessage("");
                }, 2000);
                setConfirmAlertVisible(false);

            }
        } catch (error) {
            setAlertMessage('Erro ao excluir vendas relacionadas ao cliente');
            setTimeout(() => {
                setAlertMessage("");
            }, 2000);
            setConfirmAlertVisible(false);
        }


    };

    const handleDeleteCliente = async (clienteId: string) => {
        setClienteToDelete(clienteId);
        setConfirmVisible(true);
    };

    const confirmDelete = async () => {
        if (!clienteToDelete) return;

        try {
            await deleteVendasByCliente(clienteToDelete);

            await api.delete(`/person/${clienteToDelete}`, {
                headers: {
                    Authorization: `Bearer ${tokenState}`,
                },
            });

            setClientes((prevClientes) =>
                prevClientes.filter((cliente) => cliente._id !== clienteToDelete)
            );
            setFilteredClientes((prevFilteredClientes) =>
                prevFilteredClientes.filter((cliente) => cliente._id !== clienteToDelete)
            );

            setAlertMessage('Cliente excluido com sucesso!');
            setTimeout(() => {
                setAlertMessage("");
            }, 2000);
            setConfirmAlertVisible(false);

        } catch (error) {
            setAlertMessage('Erro ao excluir um cliente!');
            setTimeout(() => {
                setAlertMessage("");
            }, 2000);
            setConfirmAlertVisible(false);
        } finally {
            setConfirmVisible(false);
        }
    };

    const handleNewCliente = () => {
        router.replace("/addCliente");
    };

    return (
        <Config>

            <Container>

                <Title>Gerenciamento de Clientes</Title>

                <Form>
                    <Controller
                        name="searchTerm"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Pesquise o nome de clientes"
                                placeholderTextColor="#6B6B6B"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />

                    <ButtonSearch onPress={handleSearch}>
                        <Ionicons name="search-outline" size={32} color={"black"} />
                    </ButtonSearch>
                </Form>

                <Button onPress={handleNewCliente}>Adicionar Cliente</Button>

                <TableContainer>
                    <TableHeader>
                        <HeaderText>Nome</HeaderText>
                        <HeaderText>Email</HeaderText>
                        <HeaderText>Opções</HeaderText>
                    </TableHeader>

                    {loading ? (
                        <ListEmptyText>Carregando...</ListEmptyText>
                    ) : (
                        <FlatList
                            data={filteredClientes}
                            keyExtractor={(item) => item._id}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={() => (
                                <ListEmptyText>
                                    Nenhum cliente foi encontrado. Tente outra pesquisa.
                                </ListEmptyText>
                            )}
                            renderItem={({ item }) => (
                                <TableRow>
                                    <RowText>{item.name}</RowText>
                                    <RowText>{item.email}</RowText>

                                    <ActionsContainer>
                                        <RemoveButton onPress={() => handleDeleteCliente(item._id)}>
                                            <Ionicons name="trash-bin-outline" size={15} color={"white"} />
                                        </RemoveButton>

                                        <BuyButton onPress={() => router.push({
                                            pathname: "/gerenciadorVendas",
                                            params: { id: item._id }
                                        })}>
                                            <Ionicons name="cart-outline" size={15} color={"black"} />
                                        </BuyButton>
                                    </ActionsContainer>
                                </TableRow>
                            )}
                        />
                    )}
                </TableContainer>
            </Container>

            <AutoHideAlert
                visible={alertMessage !== ""}
                message={alertMessage}
                duration={1000}
            />

            <ConfirmAlert
                visible={confirmVisible}
                message="Tem certeza que deseja excluir este cliente e todas as vendas associadas?"
                onCancel={() => setConfirmVisible(false)}
                onConfirm={confirmDelete}
            />

            <FooterMenu />
        </Config>
    );
}

export default Cliente;
