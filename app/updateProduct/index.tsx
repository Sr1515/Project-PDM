import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Container, ContainerAddProduct, InputContainer, InputLabel } from "./styles";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductSchema } from "@/schemas/validation";


import { AuthContext } from "@/context/AuthProvider";
import { api } from "@/api/axios";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { isValidDate, isValidFutureDate } from "@/utils/functionUtils";


import Button from "@/components/Button";
import Title from "@/components/Title";
import ImagePickerComponent from "@/components/ImagePickerComponent";
import FormInput from "@/components/Form";
import FooterMenu from "@/components/FooterMenu";
import Config from "@/components/Config";
import { AutoHideAlert } from "@/components/AutoHideAlert";
import { SimpleAlert } from "@/components/SimpleConfirmAlert";

interface ProductData {
    productName: string;
    manufactureDate: string;
    expiryDate: string;
    productType: string;
    quantity: string;
    value: string;
    description: string;
}

const UpdateProduct = () => {
    const { checkToken } = useAuth();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [productPlaceholder, setProductPlaceholder] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const { tokenState } = useContext(AuthContext);
    const [image, setImage] = useState<string | null>(null);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [confirmAlertVisible, setConfirmAlertVisible] = useState<boolean>(false);

    checkToken();

    const { control, handleSubmit, formState: { errors } } = useForm<ProductData>({
        resolver: zodResolver(addProductSchema),
        defaultValues: {
            productName: "",
            manufactureDate: "",
            expiryDate: "",
            productType: "",
            quantity: "",
            value: "",
            description: "",
        }
    });

    const productName = useWatch({ control, name: "productName" });
    const manufactureDate = useWatch({ control, name: "manufactureDate" });
    const expiryDate = useWatch({ control, name: "expiryDate" });
    const productType = useWatch({ control, name: "productType" });
    const quantity = useWatch({ control, name: "quantity" });
    const value = useWatch({ control, name: "value" });
    const description = useWatch({ control, name: "description" });

    const isProductNameValid = productName?.length >= 3;
    const isManufactureDateValid = /^(\d{2})\/(\d{2})\/(\d{4})$/.test(manufactureDate || "");
    const isExpiryDateValid = /^(\d{2})\/(\d{2})\/(\d{4})$/.test(expiryDate || "");
    const isProductTypeValid = productType?.length > 0;
    const isDescriptionValid = description?.length > 0;
    const isQuantityValid = quantity && Number(quantity) > 0;
    const isValueValid = value && parseFloat(value) > 0;

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await api.get(`/product/${id}`, {
                    headers: {
                        Authorization: `Bearer ${tokenState}`,
                    },
                });

                const updatedProduct = {
                    ...response.data,
                    ammount: String(response.data.ammount),
                    price: String(response.data.price),
                    manufacturing_date: new Date(response.data.manufacturing_date).toLocaleDateString('pt-BR'),
                    expiration_date: new Date(response.data.expiration_date).toLocaleDateString('pt-BR'),
                };

                setProductPlaceholder(updatedProduct)

            } catch (error) {
                setAlertMessage("Erro ao solicitar os dados");
                setTimeout(() => {
                    setAlertMessage("");
                }, 1000);
                setConfirmAlertVisible(false);
                setLoading(false);
            }
        };
        getProduct();

    }, [tokenState]);

    const onSubmit = async (data: ProductData) => {
        setLoading(true);

        const formattedManufacturingDate = isValidDate(data.manufactureDate);
        const formattedExpiryDateFuture = data.expiryDate ? isValidFutureDate(data.expiryDate) : null;
        const formattedExpiryDate = data.expiryDate ? isValidDate(data.expiryDate) : null;


        if (!formattedManufacturingDate) {
            setAlertMessage("Data de fabricação inválida.");
            setTimeout(() => {
                setAlertMessage("");
            }, 1000);
            setConfirmAlertVisible(false);
            setLoading(false);

            return;
        }

        if (data.expiryDate && !formattedExpiryDateFuture) {
            setAlertMessage("Data de validade inválida, produto vencido!.");
            setTimeout(() => {
                setAlertMessage("");
            }, 1000);
            setConfirmAlertVisible(false);
            setLoading(false);

            return;
        }

        const price = parseFloat(data.value);
        const ammount = parseInt(data.quantity, 10);

        if (isNaN(price) || isNaN(ammount)) {
            setAlertMessage("Por favor, insira valores válidos para preço e quantidade.");
            setTimeout(() => {
                setAlertMessage("");
            }, 1000);
            setConfirmAlertVisible(false);
            setLoading(false);

            return;
        }

        try {
            const productData = {
                "name": data.productName,
                "description": data.description,
                "ammount": ammount,
                "type": data.productType,
                "price": price,
                "manufacturing_date": formattedManufacturingDate,
                "expiration_date": formattedExpiryDate,
                "image": ""
            }

            const productResponse = await api.put(`/product/${id}`, productData, {
                headers: {
                    Authorization: `Bearer ${tokenState}`,
                },
            });

            if (productResponse.status === 200) {
                if (image) {
                    const imageName = image.split('/').pop()?.split('.').slice(0, -1).join('.');
                    const productImageName = productPlaceholder.image.split('.').slice(0, -1).join('.');

                    if (imageName !== productImageName) {

                        try {

                            const data = new FormData();

                            data.append('file', {
                                "name": "imagem.jpeg",
                                "type": "image/jpeg",
                                "uri": image
                            } as any)

                            const imageResponse = await api.patch(`/product/${id}`, data, {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                    Authorization: `Bearer ${tokenState}`,
                                },
                            });

                            if (imageResponse.status === 200) {
                                setAlertMessage("Produto atualizado com sucesso!");
                                setTimeout(() => {
                                    router.replace("/home");
                                }, 1000);
                                setConfirmAlertVisible(false);
                                setLoading(false);
                            }
                        } catch (error) {
                            setAlertMessage("Erro ao enviar a imagem. Tente novamente.");
                            setTimeout(() => {
                                setAlertMessage("");
                            }, 1000);
                            setConfirmAlertVisible(false);
                            setLoading(false);
                        }
                    } else {
                        setAlertMessage("Produto atualizado com sucesso!");
                        setTimeout(() => {
                            router.replace("/home");
                        }, 1000);
                        setConfirmAlertVisible(false);
                        setLoading(false);
                    }
                } else {
                    setAlertMessage("Produto atualizado com sucesso!");
                    setTimeout(() => {
                        router.replace("/home");
                    }, 1000);
                    setConfirmAlertVisible(false);
                    setLoading(false);
                }
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setAlertMessage("Erro desconhecido ao tentar cadastrar.");
                    setTimeout(() => {
                        setAlertMessage("");
                    }, 1000);
                    setConfirmAlertVisible(false);
                    setLoading(false);

                } else {
                    setAlertMessage("Erro de rede ou servidor. Tente novamente.");
                    setTimeout(() => {
                        setAlertMessage("");
                    }, 1000);
                    setConfirmAlertVisible(false);
                    setLoading(false);
                }
            } else {
                setAlertMessage("Erro inesperado ao tentar cadastrar.");
                setTimeout(() => {
                    setAlertMessage("");
                }, 1000);
                setConfirmAlertVisible(false);
                setLoading(false);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleImagePicked = (uri: string) => {
        setImage(uri);
    };

    return (
        <Config>
            <Container>
                <Title>Atualizar Produto</Title>
                <ScrollView>
                    <ContainerAddProduct>
                        <InputContainer>
                            <InputLabel>Nome do produto</InputLabel>
                            <FormInput
                                name="productName"
                                control={control}
                                placeholder={productPlaceholder?.name || "Nome do produto"}
                                errorMessage={errors.productName?.message}
                                errors={errors}
                                isValid={isProductNameValid && !errors.productName ? true : false}
                            />
                        </InputContainer>
                        <InputContainer>
                            <InputLabel>Data de fabricação</InputLabel>
                            <FormInput
                                name="manufactureDate"
                                control={control}
                                placeholder={productPlaceholder?.manufacturing_date || "dd/mm/aaaa"}
                                errorMessage={errors.manufactureDate?.message}
                                errors={errors}
                                isValid={isManufactureDateValid && !errors.manufactureDate ? true : false}
                            />
                        </InputContainer>

                        <InputContainer>
                            <InputLabel>Data de validade</InputLabel>
                            <FormInput
                                name="expiryDate"
                                control={control}
                                placeholder={productPlaceholder?.expiration_date || "dd/mm/aaaa"}
                                errorMessage={errors.expiryDate?.message}
                                errors={errors}
                                isValid={isExpiryDateValid && !errors.expiryDate ? true : false}
                            />
                        </InputContainer>

                        <InputContainer>
                            <InputLabel>Tipo do produto</InputLabel>
                            <FormInput
                                name="productType"
                                control={control}
                                placeholder={productPlaceholder?.type || "Digite o tipo do produto"}
                                errorMessage={errors.productType?.message}
                                errors={errors}
                                isValid={isProductTypeValid && !errors.productType ? true : false}
                            />
                        </InputContainer>

                        <InputContainer>
                            <InputLabel>Quantidade</InputLabel>
                            <FormInput
                                name="quantity"
                                control={control}
                                placeholder={productPlaceholder?.ammount || "Digite a quantidade"}
                                errorMessage={errors.quantity?.message}
                                errors={errors}
                                isValid={isQuantityValid && !errors.quantity ? true : false}
                            />
                        </InputContainer>

                        <InputContainer>
                            <InputLabel>Valor</InputLabel>
                            <FormInput
                                name="value"
                                control={control}
                                placeholder={productPlaceholder?.price || "0.00"}
                                errorMessage={errors.value?.message}
                                errors={errors}
                                isValid={isValueValid && !errors.value ? true : false}
                            />
                        </InputContainer>

                        <InputContainer>
                            <InputLabel>Descrição</InputLabel>
                            <FormInput
                                name="description"
                                control={control}
                                placeholder={productPlaceholder?.description || "Digite a descrição do produto"}
                                errorMessage={errors.description?.message}
                                errors={errors}
                                isValid={isDescriptionValid && !errors.description ? true : false}
                            />
                        </InputContainer>

                        <InputLabel>Imagem do produto</InputLabel>
                        <ImagePickerComponent onImagePicked={handleImagePicked} />

                        <Button onPress={handleSubmit(onSubmit)}>
                            {loading ? "Atualizando..." : "Atualizar Produto"}
                        </Button>
                    </ContainerAddProduct>
                </ScrollView>
            </Container>
            <FooterMenu />

            <AutoHideAlert
                visible={alertMessage !== ""}
                message={alertMessage}
                duration={1000}
            />

        </Config>
    );
};

export default UpdateProduct;
