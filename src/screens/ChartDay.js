import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants';
import { PickDateModal, Chart } from '../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { format, subDays } from 'date-fns';

const ChartDay = ({ navigation }) => {

    const [show, setShow] = React.useState(false);
    const [filterDate, setFilterDate] = React.useState(`${format(subDays(new Date(), 7), 'dd/MM/yyyy')} - ${format(new Date(), 'dd/MM/yyyy')}`);

    return (
        <View style={styles.container}>
            <View style={styles.containHeader}>
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>Doanh Thu Theo Ngày</Text>
            </View>

            {/* Modal */}

            <PickDateModal
                show={show}
                setShow={setShow}
                state="date"
                setDateChoose={setFilterDate}
            />

            {/* Button Filter */}

            <View
                style={styles.containViewButton}
            >
                <TouchableOpacity
                    style={styles.containButton}
                    onPress={() => setShow(true)}
                >
                    <AntDesign
                        size={35}
                        name="filter"
                        color={COLORS.white}
                    />
                </TouchableOpacity>
                <Text style={{ ...FONTS.h3, color: COLORS.white }}>{filterDate}</Text>
            </View>

            {/* Chart */}
            <View style={styles.containChart} >
                <Chart />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        padding: SIZES.padding,
    },
    containHeader: { alignItems: 'center' },
    containViewButton: {
        flexDirection: 'row',
        marginVertical: SIZES.padding,
        alignItems: 'center',
    },
    containChart: {
        height: 300,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containButton: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: COLORS.white,
        marginRight: SIZES.base,
    },

});

export default ChartDay;
