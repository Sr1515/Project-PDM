import React, { useEffect, useState, useContext } from 'react';
import { FlatList } from 'react-native';

import {
  Container, Form, Input,
  ButtonSearch, ButtonContainer,
  ButtonItemActionEdit, ButtonItemActionRemove,
  ButtonShow,
} from "./styles";

import {
  ProductItem, ProductText,
  ListEmptyText, ProductDescription,
  ProductPrice, ProductInfo
} from "./styles";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import { AuthContext } from "@/context/AuthProvider";
import { router } from "expo-router";
import { api } from '@/api/axios';
import { useAuth } from '@/hooks/useAuth';

import { ProductImageShow } from '@/components/ProductImage';
import Title from "@/components/Title";
import FooterMenu from "@/components/FooterMenu";
import Button from "@/components/Button";
import Config from "@/components/Config";
import ConfirmAlert from '@/components/ConfirmAlert';
import AutoHideAlert from '@/components/AutoHideAlert';

interface Product {
  _id: string;
  name: string;
  ammount: number;
  price: number;
  description: string;
}

interface SearchFormData {
  searchTerm: string;
}

function Home() {
  const { checkToken } = useAuth();

  checkToken();

  const { tokenState } = useContext(AuthContext);
  const { control, handleSubmit, setValue, getValues } = useForm<SearchFormData>();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [confirmAlertVisible, setConfirmAlertVisible] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const fetchProducts = async () => {
    if (!tokenState) {
      return;
    }

    try {
      const response = await api.get("/own-products", {
        headers: {
          Authorization: `Bearer ${tokenState}`
        }
      });

      setProducts(response.data);
      setFilteredProducts(response.data);

    } catch (error) {

      setAlertMessage("Erro ao  buscar produtos!");
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
      fetchProducts();
    }
  }, [tokenState]);

  const handleSearch = () => {
    const searchTerm = getValues("searchTerm");

    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );

      setFilteredProducts(filtered);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    setProductToDelete(productId);
    setConfirmAlertVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      try {
        await api.delete(`/product/${productToDelete}`, {
          headers: {
            Authorization: `Bearer ${tokenState}`
          }
        });

        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productToDelete)
        );
        setFilteredProducts((prevFilteredProducts) =>
          prevFilteredProducts.filter((product) => product._id !== productToDelete)
        );

        setAlertMessage("Produto excluído com sucesso!");
        setTimeout(() => {
          setAlertMessage("");
        }, 1000);
        setConfirmAlertVisible(false);

      } catch (error) {

        setAlertMessage("Erro ao  excluir o produto!");
        setTimeout(() => {
          setAlertMessage("");
        }, 1000);
        setConfirmAlertVisible(false);
      }
    }
  };

  const handleCancelDelete = () => {
    setProductToDelete(null);
    setConfirmAlertVisible(false);
  };

  const handleNewProduct = () => {
    router.replace('/addProduct');
  };

  return (
    <Config>

      <Container>

        <Title>Storage.io</Title>

        <Form>
          <Controller
            name="searchTerm"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Pesquise o nome do produto"
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

        <Button onPress={handleNewProduct}>Novo item</Button>

        {loading ? (
          <ListEmptyText>Carregando...</ListEmptyText>
        ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <ListEmptyText>
                Nenhum produto foi encontrado. Tente outra pesquisa.
              </ListEmptyText>
            )}

            renderItem={({ item }) => (
              <ProductItem>

                <ProductImageShow id={item._id} />

                <ProductInfo>
                  <ProductText>{`${item.name}`}</ProductText>
                  <ProductDescription>{`Qtd em estoque: ${item.ammount}`}</ProductDescription>
                  <ProductPrice>{`R$: ${item.price} reais`}</ProductPrice>
                  <ProductDescription>{`Descrição: ${item.description}`}</ProductDescription>
                </ProductInfo>

                <ButtonContainer>

                  <ButtonItemActionEdit onPress={() => router.push({
                    pathname: "/updateProduct",
                    params: { id: item._id }
                  })}>
                    <Ionicons name="pencil-outline" size={25} color={"black"} />
                  </ButtonItemActionEdit>

                  <ButtonItemActionRemove onPress={() => handleDeleteProduct(item._id)}>
                    <Ionicons name="trash-bin-outline" size={25} color={"white"} />
                  </ButtonItemActionRemove>

                  <ButtonShow onPress={() => router.push({
                    pathname: "/productDetail",
                    params: { id: item._id }
                  })}>
                    <Ionicons name="eye-outline" size={23} color={"black"} />
                  </ButtonShow>

                </ButtonContainer>
              </ProductItem>
            )}
          />
        )}

        <ConfirmAlert
          visible={confirmAlertVisible}
          message="Tem certeza que deseja excluir este produto?"
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />

        <AutoHideAlert
          visible={alertMessage !== ""}
          message={alertMessage}
          duration={1000}
        />


      </Container>

      <FooterMenu />

    </Config>

  );
}

export default Home;
