import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { AuthContext } from "@/context/AuthProvider";
import { api } from "@/api/axios";
import { useAuth } from "@/hooks/useAuth";

import FooterMenu from "@/components/FooterMenu";
import Title from "@/components/Title";
import Config from "@/components/Config";
import AutoHideAlert from "@/components/AutoHideAlert";
import { BoldText, Column, Container, LoadingText, ProductText, Row, TableHeader, HeaderText, RowTextList, ListEmptyText } from "./style";

interface Product {
    product_id: string;
    quantity: number;
    name?: string;
    price?: number;
}

interface Venda {
    _id: string;
    person_id: string;
    products: Product[];
    supplier_id: string;
}

function VendaDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { checkToken } = useAuth();
    const { tokenState } = useContext(AuthContext);

    const [venda, setVenda] = useState<Venda | null>(null);
    const [personName, setPersonName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [alertMessage, setAlertMessage] = useState("");
    const [autoHideAlertVisible, setAutoHideAlertVisible] = useState(false);;
    const [confirmAlertVisible, setConfirmAlertVisible] = useState<boolean>(false);

    checkToken();

    const fetchVenda = async (): Promise<void> => {
        if (!tokenState) {
            return;
        }

        try {
            const response = await api.get(`/supply/${id}`, {
                headers: {
                    Authorization: `Bearer ${tokenState}`,
                },
            });

            if (response.data) {
                const vendaData = response.data;
                setVenda(vendaData);

                const personResponse = await api.get(`/person/${vendaData.person_id}`, {
                    headers: {
                        Authorization: `Bearer ${tokenState}`,
                    },
                });
                setPersonName(personResponse.data?.name || "Nome não disponível");

                const updatedProducts = await Promise.all(
                    vendaData.products.map(async (product: Product) => {
                        try {
                            const productResponse = await api.get(`/product/${product.product_id}`, {
                                headers: {
                                    Authorization: `Bearer ${tokenState}`,
                                },
                            });
                            return {
                                ...product,
                                name: productResponse.data?.name || "Produto não encontrado",
                                price: productResponse.data?.price || 0,
                            };
                        } catch (error) {
                            setAlertMessage("Erro ao buscar produto");
                            setTimeout(() => {
                                setAlertMessage("");
                            }, 2000);
                            setConfirmAlertVisible(false);

                            return product;
                        }
                    })
                );
                setVenda((prevVenda) => prevVenda ? { ...prevVenda, products: updatedProducts } : prevVenda);
            }
        } catch (error) {
            setAlertMessage("Erro ao buscar os dados da venda!");
            setTimeout(() => {
                setAlertMessage("");
            }, 2000);
            setConfirmAlertVisible(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (tokenState) {
            fetchVenda();
        }
    }, [tokenState]);

    return (
        <Config>

            <Container>

                <Title>Detalhes da Venda</Title>

                {loading ? (
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <ActivityIndicator size="large" color="#fff" />
                        <LoadingText>Carregando...</LoadingText>
                    </View>
                ) : venda ? (
                    <View style={{ marginTop: 20 }}>

                        <ProductText><BoldText>Cliente:</BoldText> {personName}</ProductText>
                        <ProductText><BoldText>Produtos Vendidos:</BoldText></ProductText>

                        <TableHeader>
                            <HeaderText>Produto</HeaderText>
                            <HeaderText>Quantidade</HeaderText>
                            <HeaderText>Preço</HeaderText>
                        </TableHeader>

                        {venda.products.length > 0 ? (
                            <FlatList<Product>
                                data={venda.products}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }: { item: Product }) => (
                                    <Row>
                                        <RowTextList>{item.name}</RowTextList>
                                        <RowTextList>{item.quantity}</RowTextList>
                                        <RowTextList>
                                            R${item.price && item.quantity ? (item.price * item.quantity).toFixed(2) : 'Indisponível'}
                                        </RowTextList>
                                    </Row>
                                )}
                                ListEmptyComponent={() => (
                                    <ListEmptyText>Não há produtos na lista de vendas.</ListEmptyText>
                                )}
                            />
                        ) : (
                            <ProductText>Sem produtos</ProductText>
                        )}
                    </View>
                ) : (
                    <ProductText>Venda não encontrada.</ProductText>
                )}
            </Container>

            <FooterMenu />

            <AutoHideAlert
                visible={alertMessage !== ""}
                message={alertMessage}
                duration={1000}
            />


        </Config>
    );
}

export default VendaDetail;