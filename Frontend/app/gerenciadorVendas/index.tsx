import React, { useState, useEffect, useContext } from "react";
import { FlatList, Modal, Text, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
    Container,
    RowText,
    ListEmptyText,
    ModalContainer,
    ModalContent,
    ProductItem,
    ActionsContainer,
    RemoveButton,
    ButtonContainer,
    TableHeader,
    HeaderText,
    RowTextList,
    ButtonAdd,
} from "./styles";

import { useLocalSearchParams } from 'expo-router';
import { api } from "@/api/axios";
import { AuthContext } from "@/context/AuthProvider";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";

import Title from "@/components/Title";
import FooterMenu from "@/components/FooterMenu";
import Button from "@/components/Button";
import Config from "@/components/Config";
import { SimpleAlert } from "@/components/SimpleConfirmAlert";
import AutoHideAlert from "@/components/AutoHideAlert";

interface Product {
    _id: string;
    name: string;
    price: number;
    ammount: number;
}

interface SaleItem extends Product {
    quantidade: number;
    precoTotal: number;
}

function GerenciadorVendas() {
    const { checkToken } = useAuth();
    const { tokenState } = useContext(AuthContext);
    const { id } = useLocalSearchParams<{ id: string }>();

    const [produtos, setProdutos] = useState<Product[]>([]);
    const [itensVenda, setItensVenda] = useState<SaleItem[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [quantidade, setQuantidade] = useState<number>(1);
    const [modalProdutosVisible, setModalProdutosVisible] = useState<boolean>(false);
    const [modalQuantidadeVisible, setModalQuantidadeVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [isAlertVisible, setAlertVisible] = useState<boolean>(false);
    const [confirmAlertVisible, setConfirmAlertVisible] = useState<boolean>(false);
    const router = useRouter();

    checkToken();

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await api.get("/own-products", {
                    headers: {
                        Authorization: `Bearer ${tokenState}`
                    }
                });
                setProdutos(response.data);
            } catch (error) {

                setAlertMessage("Erro ao buscar produtos!");
                setTimeout(() => {
                    setAlertMessage("");
                }, 2000);
                setConfirmAlertVisible(false);

            } finally {
                setLoading(false);
            }
        };

        fetchProdutos();
    }, [tokenState]);

    const handleAdicionarProduto = async () => {
        if (!selectedProduct) {
            setAlertMessage("Selecione um produto.");
            setAlertVisible(true);
            return;
        }

        const produto = produtos.find((p) => p._id === selectedProduct._id);
        if (!produto) {
            setAlertMessage("Produto não encontrado.");
            setAlertVisible(true);
            return;
        }

        const quantidadeDisponivel = produto.ammount;
        if (quantidade > quantidadeDisponivel) {
            setAlertMessage(`Quantidade indisponível. Disponível: ${quantidadeDisponivel}`);
            setTimeout(() => {
                setAlertMessage("");
            }, 2000);
            setConfirmAlertVisible(false);

            return;
        }

        const produtoExistente = itensVenda.find((item) => item._id === selectedProduct._id);
        if (produtoExistente) {
            const updatedItens = itensVenda.map((item) =>
                item._id === selectedProduct._id
                    ? {
                        ...item,
                        quantidade: item.quantidade + quantidade,
                        precoTotal: item.price * (item.quantidade + quantidade),
                    }
                    : item
            );
            setItensVenda(updatedItens);
        } else {
            setItensVenda([
                ...itensVenda,
                {
                    ...selectedProduct,
                    quantidade: quantidade,
                    precoTotal: selectedProduct.price * quantidade,
                },
            ]);
        }

        setSelectedProduct(null);
        setQuantidade(1);
        setModalQuantidadeVisible(false);
    };

    const handleRemoverProduto = (produtoId: string) => {
        setItensVenda(itensVenda.filter((item) => item._id !== produtoId));
    };

    const handleFinalizarCompra = async () => {
        setLoading(true);

        try {
            const venda = { person_id: id };
            const products = itensVenda.map(item => ({
                product_id: item._id,
                quantity: item.quantidade,
            }));

            const vendaFormated = {
                ...venda,
                products,
            };

            await api.post("/supply", vendaFormated, {
                headers: {
                    Authorization: `Bearer ${tokenState}`,
                },
            });

            for (const item of itensVenda) {
                const produto = produtos.find((p) => p._id === item._id);
                if (produto) {
                    const ammountAfterPurchase = Number(produto.ammount) - Number(item.quantidade);
                    try {
                        await api.put(`/product/${item._id}`, {
                            "ammount": ammountAfterPurchase
                        }, {
                            headers: {
                                Authorization: `Bearer ${tokenState}`,
                            },
                        });
                    } catch (error) {
                        setAlertMessage(`Erro interno`);
                        setTimeout(() => {
                            setAlertMessage("");
                        }, 2000);
                        setConfirmAlertVisible(false);

                        return;
                    }
                }
            }

            setAlertMessage(`Venda realizada com sucesso!`);
            setTimeout(() => {
                router.replace("/venda");
            }, 2000);
            setConfirmAlertVisible(false);

        } catch (error) {
            setAlertMessage("Não foi possível finalizar a compra.");
            setTimeout(() => {
                setAlertMessage("");
            }, 2000);
            setConfirmAlertVisible(false);
        }
    };

    return (
        <Config>

            <Container>

                <Title>Gerenciador de Vendas</Title>

                <ButtonAdd>
                    <Button onPress={() => setModalProdutosVisible(true)}>
                        Adicionar Produto
                    </Button>
                </ButtonAdd>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalProdutosVisible}
                    onRequestClose={() => setModalProdutosVisible(false)}
                >
                    <ModalContainer>
                        <ModalContent>
                            <FlatList
                                data={produtos}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => (
                                    <ProductItem onPress={() => {
                                        setSelectedProduct(item);
                                        setModalProdutosVisible(false);
                                        setModalQuantidadeVisible(true);
                                    }}>
                                        <RowText>{item.name}</RowText>
                                        <RowText>R$ {item.price}</RowText>
                                    </ProductItem>
                                )}
                                ListEmptyComponent={() => (
                                    <ListEmptyText>Nenhum produto encontrado</ListEmptyText>
                                )}
                            />

                            <Button onPress={() => setModalProdutosVisible(false)}>
                                Fechar
                            </Button>
                        </ModalContent>
                    </ModalContainer>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalQuantidadeVisible}
                    onRequestClose={() => setModalQuantidadeVisible(false)}
                >
                    <ModalContainer>
                        <ModalContent>
                            <Text>Quantidade:</Text>
                            <TextInput
                                value={quantidade.toString()}
                                onChangeText={(text) => setQuantidade(Number(text))}
                                keyboardType="numeric"
                            />

                            <ButtonContainer>
                                <Button color="lightgreen" textColor="black" borderColor="green" onPress={handleAdicionarProduto}>Adicionar</Button>
                            </ButtonContainer>

                            <Button onPress={() => setModalQuantidadeVisible(false)}>
                                Fechar
                            </Button>

                        </ModalContent>

                    </ModalContainer>

                </Modal>

                <TableHeader>
                    <HeaderText>Produto</HeaderText>
                    <HeaderText>Quantidade</HeaderText>
                    <HeaderText>Preço</HeaderText>
                    <HeaderText>Ações</HeaderText>
                </TableHeader>

                <FlatList
                    data={itensVenda}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <ProductItem>
                            <RowTextList>{item.name}</RowTextList>
                            <RowTextList>{item.quantidade}</RowTextList>
                            <RowTextList>R$ {item.precoTotal.toFixed(2)}</RowTextList>
                            <ActionsContainer>
                                <RemoveButton onPress={() => handleRemoverProduto(item._id)}>
                                    <Ionicons name="trash-bin-outline" size={15} color={"white"} />
                                </RemoveButton>
                            </ActionsContainer>
                        </ProductItem>
                    )}
                    ListEmptyComponent={() => (
                        <ListEmptyText>Não há produtos na lista de vendas.</ListEmptyText>
                    )}
                />

                {itensVenda.length > 0 && (
                    <Button color="lightgreen" textColor="black" borderColor="green" onPress={handleFinalizarCompra}>
                        {loading ? "Finalizando..." : "Finalizar compra"}
                    </Button>
                )}
            </Container>

            <FooterMenu />

            <SimpleAlert
                visible={isAlertVisible}
                message={alertMessage}
                onClose={() => setAlertVisible(false)}
            />

            <AutoHideAlert
                visible={alertMessage !== ""}
                message={alertMessage}
                duration={1000}
            />

        </Config>
    );
}

export default GerenciadorVendas;
