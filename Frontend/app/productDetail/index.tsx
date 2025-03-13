import React, { useEffect, useState, useContext } from 'react';
import { View, Text } from 'react-native';

import {
  Container,
  ProductText,
  ProductDescription,
  ProductPrice,
  ProductInfo,
  ListEmptyText,
} from "./styles";

import { AuthContext } from "@/context/AuthProvider";
import { api } from '@/api/axios';
import Title from "@/components/Title";
import FooterMenu from "@/components/FooterMenu";
import Config from "@/components/Config";
import { useLocalSearchParams } from 'expo-router';
import { ProductImageShow } from '@/components/ProductImage';
import AutoHideAlert from '@/components/AutoHideAlert';

interface Product {
  _id: string;
  name: string;
  ammount: number;
  price: number;
  description: string;
  type: string;
  manufacturing_date: string;
  expiration_date: string;
}

function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tokenState } = useContext(AuthContext);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [confirmAlertVisible, setConfirmAlertVisible] = useState<boolean>(false);

  const fetchProduct = async () => {
    if (!tokenState || !id) return;

    try {
      const response = await api.get(`/product/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenState}`,
        },
      });

      setProduct(response.data);
    } catch (error) {
      setAlertMessage("Erro ao buscar produto");
      setTimeout(() => {
        setAlertMessage("");
      }, 2000);
      setConfirmAlertVisible(false);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tokenState && id) {
      fetchProduct();
    }
  }, [tokenState, id]);

  return (
    <Config>
      <Container>
        <Title>Detalhes do Produto</Title>

        {loading ? (
          <ListEmptyText>Carregando...</ListEmptyText>
        ) : product ? (
          <ProductInfo>
            <ProductText>{product.name}</ProductText>
            <ProductDescription>{`Descrição: ${product.description}`}</ProductDescription>
            <ProductDescription>{`Tipo: ${product.type}`}</ProductDescription>
            <ProductDescription>{`Quantidade em estoque: ${product.ammount}`}</ProductDescription>
            <ProductDescription>{`Data de Fabricação: ${new Date(product.manufacturing_date).toLocaleDateString()}`}</ProductDescription>
            <ProductDescription>{`Data de Validade: ${new Date(product.expiration_date).toLocaleDateString()}`}</ProductDescription>
            <ProductPrice>{`Preço: R$ ${product.price}`}</ProductPrice>

            <ProductImageShow id={product._id} width={"350"} borderRadius={20} height={250} />

          </ProductInfo>
        ) : (
          <ListEmptyText>Produto não encontrado.</ListEmptyText>
        )}
      </Container>

      <AutoHideAlert
        visible={alertMessage !== ""}
        message={alertMessage}
        duration={1000}
      />


      <FooterMenu />
    </Config>
  );
}

export default ProductDetail;
