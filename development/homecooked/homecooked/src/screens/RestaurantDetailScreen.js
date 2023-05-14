import React from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	ScrollView,
} from "react-native";
import { Card, Tile } from "react-native-elements";
import { Avatar, Button, Chip, Divider, List, Text } from "react-native-paper";
import Spacer from "../components/Spacer";
import { Ionicons } from "@expo/vector-icons";

const RestauarantDetailScreen = () => {
	const restauarantName = "Restaurant Name";
	const menuItemTitleName = "Menu item title here";
	const menuItemDescription = "Menu item description here";
	const subMenuTitle = "Submenu title here";
	const description = "Menu choice description here";
	const price = "$12,50";
	const menuItems = [
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		{},
	];
	return (
		<ScrollView style={styles.root}>
			<View>
				{/* <Card containerStyle={{ padding: 0, margin: 0, borderColor: "white",  }}>
				<Card.Image
					source={{ uri: "https://source.unsplash.com/random/?food" }}
				/>
				<Card.Title>HELLO</Card.Title>
			</Card> */}
				<Tile
					height={250}
					imageSrc={{
						uri: "https://source.unsplash.com/random/300x300/?food",
					}}></Tile>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						marginLeft: 30,
						marginRight: 10,
						marginBottom: 20,
					}}>
					<Text variant='headlineSmall'>{restauarantName}</Text>

					<Chip
						style={{
							alignSelf: "center",
							marginLeft: 50,
							marginRight: 5,
							flex: 1,
						}}
						type='flat'
						icon='star'>
						<Text style={{ alignSelf: "center" }}>TEST</Text>
					</Chip>
				</View>
				<Spacer margin={10}>
					<Divider></Divider>
				</Spacer>
				<Spacer margin={10}>
					<Text
						style={{ color: "purple", fontWeight: "600" }}
						variant='titleLarge'>
						Popular
					</Text>
				</Spacer>

				{menuItems.map((menuItem) => {
					return (
						<Spacer margin={10}>
							<List.Accordion
								title={menuItemTitleName}
								description={menuItemDescription}
								style={{ backgroundColor: "#f9f5ff" }}
								left={(props) => (
									<Avatar.Image
										{...props}
										source={{
											uri: "https://source.unsplash.com/random/100x100/?food",
										}}
									/>
								)}>
								{menuItems.map((menuItem) => {
									return (
										<>
											<List.Item
												style={{
													// display: "flex",
													// flexDirection: "row",
													// justifyContent: "space-between",
													backgroundColor: "white",
												}}
												title={subMenuTitle}
												// left={(props) => (
												// 	<Text
												// 		style={{
												// 			alignSelf: "center",
												// 			color: "purple",
												// 			fontWeight: "700",
												// 		}}>
												// 		Price: $23,-
												// 	</Text>
												// )}
												description={() => (
													<View>
														<Text>{description}</Text>
														<Text
															style={{
																marginTop: 10,
																color: "purple",
																fontWeight: "700",
															}}>
															{price}
														</Text>
													</View>
												)}
												right={(props) => (
													<TouchableOpacity
														style={{ alignSelf: "center", marginLeft: 5 }}>
														<Ionicons
															name='add-circle'
															size={24}
															color='purple'
														/>
													</TouchableOpacity>
												)}
											/>
											<Divider></Divider>
										</>
									);
								})}
							</List.Accordion>
						</Spacer>
					);
				})}

				{/* <List.Accordion
				title={menuItemTitleName}
				description={menuItemDescription}
				left={(props) => (
					<Avatar.Image
						{...props}
						source={{ uri: "https://source.unsplash.com/random/?food" }}
					/>
				)}>
				<FlatList
					data={menuItems}
					renderItem={(restaurant) => {
						<List.Item
							style={{
								// display: "flex",
								// flexDirection: "row",
								// justifyContent: "space-between",
								backgroundColor: "white",
							}}
							title={subMenuTitle}
							// left={(props) => (
							// 	<Text
							// 		style={{
							// 			alignSelf: "center",
							// 			color: "purple",
							// 			fontWeight: "700",
							// 		}}>
							// 		Price: $23,-
							// 	</Text>
							// )}
							description={() => (
								<View>
									<Text>{description}</Text>
									<Text
										style={{
											marginTop: 10,
											color: "purple",
											fontWeight: "700",
										}}>
										{price}
									</Text>
								</View>
							)}
							right={(props) => (
								<TouchableOpacity
									style={{ alignSelf: "center", marginLeft: 5 }}>
									<Ionicons name='add-circle' size={34} color='purple' />
								</TouchableOpacity>
							)}
						/>;
					}}></FlatList>
				<List.Item
					style={{
						// display: "flex",
						// flexDirection: "row",
						// justifyContent: "space-between",
						backgroundColor: "white",
					}}
					title={subMenuTitle}
					// left={(props) => (
					// 	<Text
					// 		style={{
					// 			alignSelf: "center",
					// 			color: "purple",
					// 			fontWeight: "700",
					// 		}}>
					// 		Price: $23,-
					// 	</Text>
					// )}
					description={() => (
						<View>
							<Text>{description}</Text>
							<Text
								style={{ marginTop: 10, color: "purple", fontWeight: "700" }}>
								{price}
							</Text>
						</View>
					)}
					right={(props) => (
						<TouchableOpacity style={{ alignSelf: "center", marginLeft: 5 }}>
							<Ionicons name='add-circle' size={34} color='purple' />
						</TouchableOpacity>
					)}
				/>
			</List.Accordion> */}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	root: { backgroundColor: "white", borderRadius: 0 },
});

export default RestauarantDetailScreen;
