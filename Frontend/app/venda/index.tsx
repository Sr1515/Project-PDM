import React, { useContext, useEffect, useState } from "react";
import 'react-native-reanimated';

import { FlatList } from "react-native";
import { ListEmptyText } from "../home/styles";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
    ActionsContainer, Container,
    HeaderText, RemoveButton, RowText,
    ShowButton,
    TableContainer, TableHeader, TableRow
} from "./style";

import { AuthContext } from "@/context/AuthProvider";
import { api } from "@/api/axios";
import { useAuth } from "@/hooks/useAuth";

import FooterMenu from "@/components/FooterMenu";
import Title from "@/components/Title";
import Config from "@/components/Config";
import ConfirmAlert from "@/components/ConfirmAlert";
import AutoHideAlert from "@/components/AutoHideAlert";
import { router } from "expo-router";

interface Product {
    product: {
        name: string;
    };
}

interface Venda {
    _id: string;
    person: {
        name: string;
    };
    products: Product[];
}

function Venda() {
    const { checkToken } = useAuth();
    const { tokenState } = useContext(AuthContext);
    const [vendas, setVendas] = useState<Venda[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [vendaToRemove, setVendaToRemove] = useState<string | null>(null);
    const [autoHideAlertVisible, setAutoHideAlertVisible] = useState(false);
    const [confirmAlertVisible, setConfirmAlertVisible] = useState<boolean>(false);

    checkToken();

    const fetchVendas = async (): Promise<void> => {
        if (!tokenState) {
            return;
        }

        try {
            const response = await api.get("/supply", {
                headers: {
                    Authorization: `Bearer ${tokenState}`,
                },
            });

            const filteredVendas = response.data.filter((venda: Venda) =>
                venda.person && venda.person.name && venda.products && venda.products.length > 0
            );

            setVendas(filteredVendas);

        } catch (error) {
            setAlertMessage("Erro ao buscar produtos!");
            setTimeout(() => {
                setAlertMessage("");
            }, 1000);
            setConfirmAlertVisible(false);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveVenda = (vendaId: string): void => {
        setVendaToRemove(vendaId);
        setAlertVisible(true);
        setAlertMessage("Tem certeza de que deseja excluir esta venda?");
        setConfirmAlertVisible(true);
    };

    const confirmRemoveVenda = async (): Promise<void> => {
        if (!vendaToRemove || !tokenState) {
            setAlertVisible(false);
            return;
        }

        try {
            const response = await api.delete(`/supply/${vendaToRemove}`, {
                headers: {
                    Authorization: `Bearer ${tokenState}`,
                },
            });

            setVendas((prevVendas) => prevVendas.filter((venda) => venda._id !== vendaToRemove));
            setAlertMessage("Venda excluída com sucesso!");

            setAlertVisible(false);
            setConfirmAlertVisible(false);

            setAutoHideAlertVisible(true);
            setTimeout(() => {
                setAutoHideAlertVisible(false);
            }, 3000);

        } catch (error) {
            setAlertMessage("Erro ao excluir a venda.");
            setTimeout(() => {
                setAlertMessage("");
            }, 1000);
            setConfirmAlertVisible(false);
        }
    };

    useEffect(() => {
        if (tokenState) {
            fetchVendas();
        }
    }, [tokenState]);

    return (
        <Config>
            <Container>

                <Title>Histórico de Vendas</Title>

                <TableContainer>
                    <TableHeader>
                        <HeaderText>Cliente</HeaderText>
                        <HeaderText>Produtos Vendidos</HeaderText>
                        <HeaderText>Ações</HeaderText>
                    </TableHeader>

                    {loading ? (
                        <ListEmptyText>Carregando...</ListEmptyText>
                    ) : (
                        <FlatList
                            data={vendas}
                            keyExtractor={(item) => item._id}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={() => (
                                <ListEmptyText>
                                    Nenhuma venda encontrada.
                                </ListEmptyText>
                            )}
                            renderItem={({ item }: { item: Venda }) => (
                                <TableRow>
                                    <RowText>{item.person?.name || "Nome não disponível"}</RowText>
                                    <RowText>
                                        {item.products.length > 0
                                            ? `${item.products[0]?.product?.name || "..."} ${item.products.length > 1 ? '...' : ''}`
                                            : "Sem produtos"}
                                    </RowText>

                                    <ActionsContainer>

                                        <ShowButton onPress={() => router.push({
                                            pathname: "/vendaDetail",
                                            params: { id: item._id }
                                        })}>
                                            <Ionicons name="eye-outline" size={15} color={"black"} />
                                        </ShowButton>

                                        <RemoveButton onPress={() => handleRemoveVenda(item._id)}>
                                            <Ionicons name="trash-bin-outline" size={15} color={"white"} />
                                        </RemoveButton>

                                    </ActionsContainer>
                                </TableRow>
                            )}
                        />
                    )}
                </TableContainer>

            </Container>

            <FooterMenu />

            <ConfirmAlert
                visible={alertVisible}
                message={alertMessage}
                onCancel={() => {
                    setAlertVisible(false);
                    setConfirmAlertVisible(false);
                }}
                onConfirm={confirmRemoveVenda}
            />

            <AutoHideAlert
                visible={autoHideAlertVisible}
                message={alertMessage}
                duration={3000}
            />
        </Config>
    );
}

export default Venda;
